export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  overall_rating: number;
  pace: number;
  shooting: number;
  passing: number;
  defending: number;
  dribbling: number;
  physicality: number;
  age: number;
  market_value: number;
}

export interface SquadAnalysis {
  overall_rating: number;
  predicted_position: number;
  position_range: {
    best_case: number;
    worst_case: number;
  };
  strengths: string[];
  weaknesses: string[];
  squad_balance: {
    attack: number;
    midfield: number;
    defense: number;
    goalkeeping: number;
  };
  confidence: number;
}

export async function predictLeaguePlacement(squad: Player[]): Promise<SquadAnalysis> {
  try {
    // Validate squad composition
    const validation = validateSquad(squad);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Calculate positional ratings
    const squadBalance = calculateSquadBalance(squad);
    
    // Calculate overall squad rating
    const overallRating = calculateOverallRating(squad, squadBalance);
    
    // Predict league position based on rating
    const predictedPosition = calculateLeaguePosition(overallRating);
    
    // Analyze strengths and weaknesses
    const strengths = identifyStrengths(squadBalance, squad);
    const weaknesses = identifyWeaknesses(squadBalance, squad);
    
    // Calculate confidence based on squad balance and quality
    const confidence = calculateConfidence(squadBalance, squad);
    
    return {
      overall_rating: Math.round(overallRating),
      predicted_position: predictedPosition,
      position_range: {
        best_case: Math.max(1, predictedPosition - 3),
        worst_case: Math.min(20, predictedPosition + 3)
      },
      strengths,
      weaknesses,
      squad_balance: {
        attack: Math.round(squadBalance.attack),
        midfield: Math.round(squadBalance.midfield),
        defense: Math.round(squadBalance.defense),
        goalkeeping: Math.round(squadBalance.goalkeeping)
      },
      confidence: Math.round(confidence)
    };
    
  } catch (error) {
    console.error('Error predicting league placement:', error);
    throw new Error('Failed to predict league placement');
  }
}

function validateSquad(squad: Player[]): { isValid: boolean; error?: string } {
  if (squad.length < 11) {
    return { isValid: false, error: 'Squad must have at least 11 players' };
  }
  
  if (squad.length > 25) {
    return { isValid: false, error: 'Squad cannot have more than 25 players' };
  }
  
  const positions = squad.reduce((acc, player) => {
    acc[player.position] = (acc[player.position] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  if (!positions.GK || positions.GK < 1) {
    return { isValid: false, error: 'Squad must have at least 1 goalkeeper' };
  }
  
  if (!positions.DEF || positions.DEF < 3) {
    return { isValid: false, error: 'Squad must have at least 3 defenders' };
  }
  
  if (!positions.MID || positions.MID < 3) {
    return { isValid: false, error: 'Squad must have at least 3 midfielders' };
  }
  
  if (!positions.FWD || positions.FWD < 1) {
    return { isValid: false, error: 'Squad must have at least 1 forward' };
  }
  
  return { isValid: true };
}

function calculateSquadBalance(squad: Player[]) {
  const positions = {
    GK: squad.filter(p => p.position === 'GK'),
    DEF: squad.filter(p => p.position === 'DEF'),
    MID: squad.filter(p => p.position === 'MID'),
    FWD: squad.filter(p => p.position === 'FWD')
  };
  
  // Calculate average ratings for each position (top players in each position)
  const goalkeeping = positions.GK.length > 0 
    ? positions.GK.sort((a, b) => b.overall_rating - a.overall_rating)[0].overall_rating
    : 50;
    
  const defense = positions.DEF.length > 0
    ? positions.DEF
        .sort((a, b) => b.overall_rating - a.overall_rating)
        .slice(0, 4)
        .reduce((sum, p) => sum + p.overall_rating, 0) / Math.min(4, positions.DEF.length)
    : 50;
    
  const midfield = positions.MID.length > 0
    ? positions.MID
        .sort((a, b) => b.overall_rating - a.overall_rating)
        .slice(0, 4)
        .reduce((sum, p) => sum + p.overall_rating, 0) / Math.min(4, positions.MID.length)
    : 50;
    
  const attack = positions.FWD.length > 0
    ? positions.FWD
        .sort((a, b) => b.overall_rating - a.overall_rating)
        .slice(0, 3)
        .reduce((sum, p) => sum + p.overall_rating, 0) / Math.min(3, positions.FWD.length)
    : 50;
  
  return { goalkeeping, defense, midfield, attack };
}

function calculateOverallRating(squad: Player[], balance: any): number {
  // Weight different positions based on their importance
  const weights = {
    goalkeeping: 0.15,
    defense: 0.30,
    midfield: 0.30,
    attack: 0.25
  };
  
  const weightedRating = 
    balance.goalkeeping * weights.goalkeeping +
    balance.defense * weights.defense +
    balance.midfield * weights.midfield +
    balance.attack * weights.attack;
  
  // Factor in squad depth
  const depthBonus = Math.min(5, (squad.length - 11) * 0.5);
  
  // Factor in age balance (peak age around 26-28)
  const avgAge = squad.reduce((sum, p) => sum + p.age, 0) / squad.length;
  const ageBonus = avgAge >= 24 && avgAge <= 30 ? 2 : avgAge < 24 ? 1 : -1;
  
  return Math.max(40, Math.min(95, weightedRating + depthBonus + ageBonus));
}

function calculateLeaguePosition(overallRating: number): number {
  // Map overall rating to league position
  if (overallRating >= 88) return 1;  // Title contenders
  if (overallRating >= 85) return 2;  // Top 2
  if (overallRating >= 82) return 4;  // Top 4
  if (overallRating >= 78) return 7;  // European spots
  if (overallRating >= 74) return 10; // Mid-table
  if (overallRating >= 70) return 13; // Lower mid-table
  if (overallRating >= 65) return 16; // Relegation battle
  return 19; // Relegation zone
}

function identifyStrengths(balance: any, squad: Player[]): string[] {
  const strengths: string[] = [];
  
  if (balance.attack >= 80) strengths.push('Exceptional attacking threat');
  else if (balance.attack >= 75) strengths.push('Strong attacking options');
  
  if (balance.defense >= 80) strengths.push('Solid defensive foundation');
  else if (balance.defense >= 75) strengths.push('Reliable defense');
  
  if (balance.midfield >= 80) strengths.push('Dominant midfield control');
  else if (balance.midfield >= 75) strengths.push('Strong midfield presence');
  
  if (balance.goalkeeping >= 80) strengths.push('World-class goalkeeper');
  else if (balance.goalkeeping >= 75) strengths.push('Reliable goalkeeper');
  
  // Check for pace
  const avgPace = squad.reduce((sum, p) => sum + p.pace, 0) / squad.length;
  if (avgPace >= 75) strengths.push('High team pace');
  
  // Check for experience
  const avgAge = squad.reduce((sum, p) => sum + p.age, 0) / squad.length;
  if (avgAge >= 28) strengths.push('Experienced squad');
  else if (avgAge <= 24) strengths.push('Young and energetic');
  
  return strengths.length > 0 ? strengths : ['Balanced squad composition'];
}

function identifyWeaknesses(balance: any, squad: Player[]): string[] {
  const weaknesses: string[] = [];
  
  if (balance.attack < 65) weaknesses.push('Lacks attacking threat');
  if (balance.defense < 65) weaknesses.push('Defensive vulnerabilities');
  if (balance.midfield < 65) weaknesses.push('Weak midfield control');
  if (balance.goalkeeping < 65) weaknesses.push('Goalkeeper concerns');
  
  // Check squad depth
  if (squad.length < 16) weaknesses.push('Limited squad depth');
  
  // Check age balance
  const avgAge = squad.reduce((sum, p) => sum + p.age, 0) / squad.length;
  if (avgAge >= 32) weaknesses.push('Aging squad');
  else if (avgAge <= 21) weaknesses.push('Lacks experience');
  
  // Check pace
  const avgPace = squad.reduce((sum, p) => sum + p.pace, 0) / squad.length;
  if (avgPace < 60) weaknesses.push('Lacks pace');
  
  return weaknesses.length > 0 ? weaknesses : ['No significant weaknesses identified'];
}

function calculateConfidence(balance: any, squad: Player[]): number {
  let confidence = 70; // Base confidence
  
  // Boost confidence for balanced squads
  const ratings = [balance.attack, balance.defense, balance.midfield, balance.goalkeeping];
  const variance = ratings.reduce((sum, rating) => sum + Math.pow(rating - 75, 2), 0) / 4;
  confidence += Math.max(-10, Math.min(10, (20 - variance) / 2));
  
  // Boost for squad depth
  if (squad.length >= 20) confidence += 5;
  else if (squad.length < 14) confidence -= 5;
  
  // Boost for age balance
  const avgAge = squad.reduce((sum, p) => sum + p.age, 0) / squad.length;
  if (avgAge >= 24 && avgAge <= 30) confidence += 5;
  
  return Math.max(50, Math.min(95, confidence));
}

// Mock player database for demonstration
export const MOCK_PLAYERS: Player[] = [
  // Goalkeepers
  { id: '1', name: 'Alisson Becker', position: 'GK', overall_rating: 89, pace: 45, shooting: 25, passing: 78, defending: 85, dribbling: 65, physicality: 88, age: 30, market_value: 60000000 },
  { id: '2', name: 'Ederson', position: 'GK', overall_rating: 88, pace: 50, shooting: 30, passing: 85, defending: 82, dribbling: 70, physicality: 85, age: 29, market_value: 55000000 },
  
  // Defenders
  { id: '3', name: 'Virgil van Dijk', position: 'DEF', overall_rating: 90, pace: 70, shooting: 45, passing: 85, defending: 95, dribbling: 75, physicality: 92, age: 32, market_value: 70000000 },
  { id: '4', name: 'Ruben Dias', position: 'DEF', overall_rating: 88, pace: 65, shooting: 40, passing: 82, defending: 92, dribbling: 70, physicality: 88, age: 26, market_value: 80000000 },
  { id: '5', name: 'Trent Alexander-Arnold', position: 'DEF', overall_rating: 87, pace: 78, shooting: 70, passing: 92, defending: 78, dribbling: 82, physicality: 75, age: 25, market_value: 75000000 },
  
  // Midfielders
  { id: '6', name: 'Kevin De Bruyne', position: 'MID', overall_rating: 91, pace: 75, shooting: 88, passing: 95, defending: 65, dribbling: 88, physicality: 78, age: 32, market_value: 90000000 },
  { id: '7', name: 'Bruno Fernandes', position: 'MID', overall_rating: 86, pace: 70, shooting: 85, passing: 90, defending: 68, dribbling: 82, physicality: 75, age: 29, market_value: 70000000 },
  { id: '8', name: 'Declan Rice', position: 'MID', overall_rating: 84, pace: 72, shooting: 65, passing: 80, defending: 88, dribbling: 75, physicality: 85, age: 24, market_value: 85000000 },
  
  // Forwards
  { id: '9', name: 'Erling Haaland', position: 'FWD', overall_rating: 91, pace: 89, shooting: 94, passing: 70, defending: 35, dribbling: 80, physicality: 92, age: 23, market_value: 150000000 },
  { id: '10', name: 'Mohamed Salah', position: 'FWD', overall_rating: 89, pace: 90, shooting: 87, passing: 78, defending: 45, dribbling: 90, physicality: 75, age: 31, market_value: 65000000 },
  { id: '11', name: 'Harry Kane', position: 'FWD', overall_rating: 88, pace: 70, shooting: 92, passing: 85, defending: 50, dribbling: 82, physicality: 88, age: 30, market_value: 80000000 }
];
