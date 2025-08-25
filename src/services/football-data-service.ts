import { FOOTBALL_DATA_CONFIG, MOCK_TEAMS, MOCK_PLAYERS } from '@/lib/api/football-data-config';
import { Player, Team } from '@/types/football-data';

export class FootballDataService {
  private static instance: FootballDataService;
  private isMockMode = true; // Start with mock data for immediate functionality

  public static getInstance(): FootballDataService {
    if (!FootballDataService.instance) {
      FootballDataService.instance = new FootballDataService();
    }
    return FootballDataService.instance;
  }

  // Get all teams with mock data
  async getAllTeams(): Promise<Team[]> {
    if (this.isMockMode) {
      return MOCK_TEAMS;
    }
    // Real API call would go here
    return MOCK_TEAMS;
  }

  // Get team by ID
  async getTeamById(id: number): Promise<Team | undefined> {
    if (this.isMockMode) {
      return MOCK_TEAMS.find(team => team.id === id);
    }
    return MOCK_TEAMS.find(team => team.id === id);
  }

  // Get all players
  async getAllPlayers(): Promise<Player[]> {
    if (this.isMockMode) {
      return MOCK_PLAYERS;
    }
    return MOCK_PLAYERS;
  }

  // Get player by ID
  async getPlayerById(id: number): Promise<Player | undefined> {
    if (this.isMockMode) {
      return MOCK_PLAYERS.find(player => player.id === id);
    }
    return MOCK_PLAYERS.find(player => player.id === id);
  }

  // Search players by name or position
  async searchPlayers(query: string): Promise<Player[]> {
    if (this.isMockMode) {
      return MOCK_PLAYERS.filter(player => 
        player.name.toLowerCase().includes(query.toLowerCase()) ||
        player.position.toLowerCase().includes(query.toLowerCase())
      );
    }
    return MOCK_PLAYERS.filter(player => 
      player.name.toLowerCase().includes(query.toLowerCase()) ||
      player.position.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Get players by team
  async getPlayersByTeam(teamId: number): Promise<Player[]> {
    if (this.isMockMode) {
      return MOCK_PLAYERS.filter(player => player.team === MOCK_TEAMS.find(t => t.id === teamId)?.name);
    }
    return MOCK_PLAYERS.filter(player => player.team === MOCK_TEAMS.find(t => t.id === teamId)?.name);
  }

  // Get formations for squad builder
  getAvailableFormations(): string[] {
    return [
      '4-3-3',
      '4-4-2',
      '4-2-3-1',
      '3-5-2',
      '3-4-3',
      '5-3-2',
      '4-1-2-1-2',
      '4-3-1-2',
      '3-4-1-2',
      '4-5-1',
      '5-4-1'
    ];
  }

  // Get formation details
  getFormationDetails(formation: string): {
    defenders: number;
    midfielders: number;
    forwards: number;
  } {
    const formationMap: Record<string, { defenders: number; midfielders: number; forwards: number }> = {
      '4-3-3': { defenders: 4, midfielders: 3, forwards: 3 },
      '4-4-2': { defenders: 4, midfielders: 4, forwards: 2 },
      '4-2-3-1': { defenders: 4, midfielders: 5, forwards: 1 },
      '3-5-2': { defenders: 3, midfielders: 5, forwards: 2 },
      '3-4-3': { defenders: 3, midfielders: 4, forwards: 3 },
      '5-3-2': { defenders: 5, midfielders: 3, forwards: 2 },
      '4-1-2-1-2': { defenders: 4, midfielders: 4, forwards: 2 },
      '4-3-1-2': { defenders: 4, midfielders: 4, forwards: 2 },
      '3-4-1-2': { defenders: 3, midfielders: 5, forwards: 2 },
      '4-5-1': { defenders: 4, midfielders: 5, forwards: 1 },
      '5-4-1': { defenders: 5, midfielders: 4, forwards: 1 }
    };
    return formationMap[formation] || { defenders: 4, midfielders: 3, forwards: 3 };
  }

  // Get formation positions
  getFormationPositions(formation: string): string[] {
    const formationMap: Record<string, string[]> = {
      '4-3-3': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CM', 'CM', 'RW', 'ST', 'LW'],
      '4-4-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'LM', 'ST', 'ST'],
      '4-2-3-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'CAM', 'RW', 'LW', 'ST'],
      '3-5-2': ['GK', 'CB', 'CB', 'CB', 'RWB', 'LWB', 'CM', 'CM', 'CM', 'ST', 'ST'],
      '3-4-3': ['GK', 'CB', 'CB', 'CB', 'RWB', 'LWB', 'CM', 'CM', 'RW', 'ST', 'LW'],
      '5-3-2': ['GK', 'RB', 'CB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CM', 'ST', 'ST'],
      '4-1-2-1-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CM', 'CM', 'CAM', 'ST', 'ST'],
      '4-3-1-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CM', 'CAM', 'ST', 'ST'],
      '3-4-1-2': ['GK', 'CB', 'CB', 'CB', 'RWB', 'LWB', 'CM', 'CM', 'CAM', 'ST', 'ST'],
      '4-5-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'CM', 'LM', 'ST'],
      '5-4-1': ['GK', 'RB', 'CB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'LM', 'ST']
    };
    return formationMap[formation] || ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CM', 'CM', 'RW', 'ST', 'LW'];
  }
}
