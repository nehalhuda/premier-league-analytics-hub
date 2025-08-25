export interface TeamStats {
  name: string;
  midfield_passing: number;
  midfield_buildup: number;
  midfield_defense: number;
  midfield_physicality: number;
  defense_strength: number;
  defense_pace: number;
  attack_finishing: number;
  attack_pace: number;
  attack_creativity: number;
  goalkeeping_quality: number;
}

export interface ScoutingReport {
  priority_needs: PlayerRecommendation[];
  secondary_needs: PlayerRecommendation[];
  team_analysis: {
    strengths: string[];
    weaknesses: string[];
    overall_balance: number;
  };
  recommended_formation: string;
  tactical_suggestions: string[];
}

export interface PlayerRecommendation {
  position: string;
  player_type: string;
  key_attributes: string[];
  reasoning: string;
  urgency: 'High' | 'Medium' | 'Low';
  suggested_players?: string[];
}

export async function generateScoutReport(teamStats: TeamStats): Promise<ScoutingReport> {
  try {
    // Analyze team strengths and weaknesses
    const analysis = analyzeTeamBalance(teamStats);
    
    // Generate priority recommendations
    const priorityNeeds = identifyPriorityNeeds(teamStats, analysis);
    
    // Generate secondary recommendations
    const secondaryNeeds = identifySecondaryNeeds(teamStats, analysis);
    
    // Suggest formation based on team strengths
    const recommendedFormation = suggestFormation(teamStats, analysis);
    
    // Generate tactical suggestions
    const tacticalSuggestions = generateTacticalSuggestions(teamStats, analysis);
    
    return {
      priority_needs: priorityNeeds,
      secondary_needs: secondaryNeeds,
      team_analysis: analysis,
      recommended_formation: recommendedFormation,
      tactical_suggestions: tacticalSuggestions
    };
    
  } catch (error) {
    console.error('Error generating scout report:', error);
    throw new Error('Failed to generate scouting report');
  }
}

function analyzeTeamBalance(stats: TeamStats) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // Analyze midfield
  if (stats.midfield_passing >= 80) {
    strengths.push('Excellent passing ability in midfield');
  } else if (stats.midfield_passing <= 60) {
    weaknesses.push('Poor midfield passing and distribution');
  }
  
  if (stats.midfield_buildup >= 80) {
    strengths.push('Strong buildup play from midfield');
  } else if (stats.midfield_buildup <= 60) {
    weaknesses.push('Struggles with buildup play and progression');
  }
  
  if (stats.midfield_defense >= 80) {
    strengths.push('Solid defensive midfield presence');
  } else if (stats.midfield_defense <= 60) {
    weaknesses.push('Lacks defensive protection in midfield');
  }
  
  if (stats.midfield_physicality >= 80) {
    strengths.push('Physically dominant midfield');
  } else if (stats.midfield_physicality <= 60) {
    weaknesses.push('Lacks physicality and presence in midfield');
  }
  
  // Analyze defense
  if (stats.defense_strength >= 80) {
    strengths.push('Rock-solid defensive foundation');
  } else if (stats.defense_strength <= 60) {
    weaknesses.push('Vulnerable defensive line');
  }
  
  if (stats.defense_pace >= 80) {
    strengths.push('Pacey defense capable of high line');
  } else if (stats.defense_pace <= 60) {
    weaknesses.push('Slow defense vulnerable to pace');
  }
  
  // Analyze attack
  if (stats.attack_finishing >= 80) {
    strengths.push('Clinical finishing in front of goal');
  } else if (stats.attack_finishing <= 60) {
    weaknesses.push('Poor conversion rate and finishing');
  }
  
  if (stats.attack_pace >= 80) {
    strengths.push('Lightning-fast attacking transitions');
  } else if (stats.attack_pace <= 60) {
    weaknesses.push('Lacks pace in attacking areas');
  }
  
  if (stats.attack_creativity >= 80) {
    strengths.push('Highly creative attacking play');
  } else if (stats.attack_creativity <= 60) {
    weaknesses.push('Lacks creativity and chance creation');
  }
  
  // Analyze goalkeeping
  if (stats.goalkeeping_quality >= 80) {
    strengths.push('World-class goalkeeping');
  } else if (stats.goalkeeping_quality <= 60) {
    weaknesses.push('Goalkeeping concerns and inconsistency');
  }
  
  // Calculate overall balance
  const allStats = [
    stats.midfield_passing, stats.midfield_buildup, stats.midfield_defense, stats.midfield_physicality,
    stats.defense_strength, stats.defense_pace, stats.attack_finishing, stats.attack_pace,
    stats.attack_creativity, stats.goalkeeping_quality
  ];
  
  const overallBalance = Math.round(allStats.reduce((sum, stat) => sum + stat, 0) / allStats.length);
  
  return { strengths, weaknesses, overall_balance: overallBalance };
}

function identifyPriorityNeeds(stats: TeamStats, analysis: any): PlayerRecommendation[] {
  const needs: PlayerRecommendation[] = [];
  
  // Check for critical midfield needs
  if (stats.midfield_defense <= 50 && (stats.midfield_passing >= 75 || stats.midfield_buildup >= 75)) {
    needs.push({
      position: 'Defensive Midfielder',
      player_type: 'Box-to-Box Destroyer',
      key_attributes: ['Tackling', 'Interceptions', 'Physicality', 'Work Rate'],
      reasoning: 'Your midfield excels at passing and buildup but lacks defensive protection. A defensive midfielder would provide the shield your creative players need.',
      urgency: 'High',
      suggested_players: ['Declan Rice', 'Casemiro', 'Fabinho']
    });
  }
  
  if (stats.midfield_physicality <= 50 && stats.midfield_passing >= 75) {
    needs.push({
      position: 'Central Midfielder',
      player_type: 'Physical Presence',
      key_attributes: ['Physicality', 'Aerial Ability', 'Stamina', 'Passing'],
      reasoning: 'Your midfield has excellent technical ability but lacks the physical presence to compete in intense matches.',
      urgency: 'High',
      suggested_players: ['Yves Bissouma', 'Moises Caicedo', 'Tyler Adams']
    });
  }
  
  // Check for defensive needs
  if (stats.defense_pace <= 50 && stats.attack_pace >= 75) {
    needs.push({
      position: 'Centre-Back',
      player_type: 'Pacey Defender',
      key_attributes: ['Pace', 'Recovery Speed', 'Positioning', 'Passing'],
      reasoning: 'Your attacking pace creates opportunities but your slow defense is vulnerable to counter-attacks.',
      urgency: 'High',
      suggested_players: ['Josko Gvardiol', 'Alessandro Bastoni', 'Jurrien Timber']
    });
  }
  
  if (stats.defense_strength <= 50) {
    needs.push({
      position: 'Centre-Back',
      player_type: 'Defensive Leader',
      key_attributes: ['Defending', 'Aerial Ability', 'Leadership', 'Positioning'],
      reasoning: 'Your defense lacks the fundamental strength and organization needed for Premier League competition.',
      urgency: 'High',
      suggested_players: ['Virgil van Dijk', 'Ruben Dias', 'William Saliba']
    });
  }
  
  // Check for attacking needs
  if (stats.attack_finishing <= 50 && (stats.attack_creativity >= 70 || stats.midfield_passing >= 70)) {
    needs.push({
      position: 'Striker',
      player_type: 'Clinical Finisher',
      key_attributes: ['Finishing', 'Positioning', 'Composure', 'Movement'],
      reasoning: 'Your team creates chances but lacks a reliable finisher to convert them into goals.',
      urgency: 'High',
      suggested_players: ['Erling Haaland', 'Harry Kane', 'Ivan Toney']
    });
  }
  
  // Check for goalkeeping needs
  if (stats.goalkeeping_quality <= 55) {
    needs.push({
      position: 'Goalkeeper',
      player_type: 'Reliable Shot-Stopper',
      key_attributes: ['Shot Stopping', 'Distribution', 'Command of Area', 'Consistency'],
      reasoning: 'Goalkeeping inconsistency is costing points. A reliable keeper would provide the foundation for defensive stability.',
      urgency: 'High',
      suggested_players: ['Alisson Becker', 'Ederson', 'Aaron Ramsdale']
    });
  }
  
  return needs;
}

function identifySecondaryNeeds(stats: TeamStats, analysis: any): PlayerRecommendation[] {
  const needs: PlayerRecommendation[] = [];
  
  // Secondary midfield improvements
  if (stats.midfield_passing >= 60 && stats.midfield_passing <= 75) {
    needs.push({
      position: 'Central Midfielder',
      player_type: 'Deep-Lying Playmaker',
      key_attributes: ['Passing', 'Vision', 'Ball Retention', 'Positioning'],
      reasoning: 'Upgrading your midfield passing would improve overall team fluidity and control.',
      urgency: 'Medium',
      suggested_players: ['Rodri', 'Jorginho', 'Thiago Alcantara']
    });
  }
  
  // Secondary attacking improvements
  if (stats.attack_creativity >= 60 && stats.attack_creativity <= 75) {
    needs.push({
      position: 'Attacking Midfielder/Winger',
      player_type: 'Creative Playmaker',
      key_attributes: ['Creativity', 'Dribbling', 'Passing', 'Pace'],
      reasoning: 'Additional creativity would unlock more scoring opportunities and improve attacking variety.',
      urgency: 'Medium',
      suggested_players: ['Kevin De Bruyne', 'Bruno Fernandes', 'Martin Odegaard']
    });
  }
  
  if (stats.attack_pace >= 60 && stats.attack_pace <= 75) {
    needs.push({
      position: 'Winger',
      player_type: 'Pacey Wide Player',
      key_attributes: ['Pace', 'Dribbling', 'Crossing', 'Direct Running'],
      reasoning: 'Adding pace on the wings would stretch defenses and create more space for central players.',
      urgency: 'Medium',
      suggested_players: ['Mohamed Salah', 'Bukayo Saka', 'Luis Diaz']
    });
  }
  
  // Depth and rotation options
  if (analysis.overall_balance >= 70) {
    needs.push({
      position: 'Utility Player',
      player_type: 'Versatile Squad Player',
      key_attributes: ['Versatility', 'Work Rate', 'Consistency', 'Team Player'],
      reasoning: 'Your squad has good balance but could benefit from versatile players for rotation and tactical flexibility.',
      urgency: 'Low',
      suggested_players: ['James Milner', 'Oleksandr Zinchenko', 'Emile Smith Rowe']
    });
  }
  
  return needs;
}

function suggestFormation(stats: TeamStats, analysis: any): string {
  // Analyze team strengths to suggest best formation
  const midfieldStrength = (stats.midfield_passing + stats.midfield_buildup + stats.midfield_defense) / 3;
  const attackStrength = (stats.attack_finishing + stats.attack_pace + stats.attack_creativity) / 3;
  const defenseStrength = (stats.defense_strength + stats.defense_pace) / 2;
  
  if (midfieldStrength >= 75 && attackStrength >= 70) {
    return '4-3-3 (Possession-based)';
  } else if (defenseStrength >= 75 && stats.midfield_defense >= 70) {
    return '5-3-2 (Defensive Stability)';
  } else if (attackStrength >= 75) {
    return '4-2-3-1 (Attack-minded)';
  } else if (midfieldStrength >= 70) {
    return '4-4-2 (Balanced)';
  } else {
    return '5-4-1 (Defensive)';
  }
}

function generateTacticalSuggestions(stats: TeamStats, analysis: any): string[] {
  const suggestions: string[] = [];
  
  if (stats.midfield_passing >= 75) {
    suggestions.push('Focus on possession-based football to utilize your passing strengths');
  }
  
  if (stats.attack_pace >= 75) {
    suggestions.push('Implement quick counter-attacking strategies');
  }
  
  if (stats.defense_strength >= 75) {
    suggestions.push('Use a high defensive line to compress the game');
  }
  
  if (stats.midfield_defense <= 60) {
    suggestions.push('Consider playing with two defensive midfielders for extra protection');
  }
  
  if (stats.attack_creativity <= 60) {
    suggestions.push('Focus on set-piece situations to create scoring opportunities');
  }
  
  if (stats.midfield_physicality >= 75) {
    suggestions.push('Use direct, physical play to dominate midfield battles');
  }
  
  return suggestions.length > 0 ? suggestions : ['Focus on balanced team development'];
}

// Mock team presets for demonstration
export const MOCK_TEAM_PRESETS = {
  'Manchester City': {
    name: 'Manchester City',
    midfield_passing: 92,
    midfield_buildup: 90,
    midfield_defense: 75,
    midfield_physicality: 70,
    defense_strength: 85,
    defense_pace: 78,
    attack_finishing: 88,
    attack_pace: 82,
    attack_creativity: 90,
    goalkeeping_quality: 88
  },
  'Arsenal': {
    name: 'Arsenal',
    midfield_passing: 88,
    midfield_buildup: 85,
    midfield_defense: 70,
    midfield_physicality: 65,
    defense_strength: 80,
    defense_pace: 75,
    attack_finishing: 82,
    attack_pace: 85,
    attack_creativity: 88,
    goalkeeping_quality: 82
  },
  'Burnley': {
    name: 'Burnley',
    midfield_passing: 65,
    midfield_buildup: 60,
    midfield_defense: 78,
    midfield_physicality: 85,
    defense_strength: 75,
    defense_pace: 60,
    attack_finishing: 65,
    attack_pace: 62,
    attack_creativity: 58,
    goalkeeping_quality: 70
  }
};
