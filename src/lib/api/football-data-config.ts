export const FOOTBALL_DATA_CONFIG = {
  BASE_URL: 'https://api.football-data.org/v4',
  ENDPOINTS: {
    COMPETITIONS: '/competitions',
    TEAMS: '/teams',
    PLAYERS: '/players',
    MATCHES: '/matches',
    STANDINGS: '/competitions/{id}/standings',
    COMPETITION_TEAMS: '/competitions/{id}/teams',
    PLAYER_SEARCH: '/players/search'
  },
  COMPETITIONS: {
    PREMIER_LEAGUE: 2021,
    LA_LIGA: 2014,
    SERIE_A: 2019,
    BUNDESLIGA: 2002,
    LIGUE_1: 2015,
    CHAMPIONS_LEAGUE: 2001
  },
  RATE_LIMIT: {
    requestsPerMinute: 10,
    requestsPerDay: 100
  }
} as const;

export const MOCK_TEAMS = [
  {
    id: 1,
    name: 'Manchester City',
    shortName: 'Man City',
    tla: 'MCI',
    crest: 'https://crests.football-data.org/65.png',
    address: 'Sportcity Manchester M11 3FF',
    website: 'https://www.mancity.com',
    founded: 1880,
    clubColors: 'Sky Blue / White',
    venue: 'Etihad Stadium',
    squad: []
  },
  {
    id: 2,
    name: 'Arsenal',
    shortName: 'Arsenal',
    tla: 'ARS',
    crest: 'https://crests.football-data.org/57.png',
    address: '75 Drayton Park London N5 1BU',
    website: 'https://www.arsenal.com',
    founded: 1886,
    clubColors: 'Red / White',
    venue: 'Emirates Stadium',
    squad: []
  },
  {
    id: 3,
    name: 'Liverpool',
    shortName: 'Liverpool',
    tla: 'LIV',
    crest: 'https://crests.football-data.org/64.png',
    address: 'Anfield Road Liverpool L4 0TH',
    website: 'https://www.liverpoolfc.com',
    founded: 1892,
    clubColors: 'Red / White',
    venue: 'Anfield',
    squad: []
  },
  {
    id: 4,
    name: 'Manchester United',
    shortName: 'Man United',
    tla: 'MUN',
    crest: 'https://crests.football-data.org/66.png',
    address: 'Sir Matt Busby Way Manchester M16 0RA',
    website: 'https://www.manutd.com',
    founded: 1878,
    clubColors: 'Red / White / Black',
    venue: 'Old Trafford',
    squad: []
  },
  {
    id: 5,
    name: 'Chelsea',
    shortName: 'Chelsea',
    tla: 'CHE',
    crest: 'https://crests.football-data.org/61.png',
    address: 'Fulham Road London SW6 1HS',
    website: 'https://www.chelseafc.com',
    founded: 1905,
    clubColors: 'Blue / White',
    venue: 'Stamford Bridge',
    squad: []
  },
  {
    id: 6,
    name: 'Tottenham Hotspur',
    shortName: 'Tottenham',
    tla: 'TOT',
    crest: 'https://crests.football-data.org/73.png',
    address: 'Bill Nicholson Way London N17 0AP',
    website: 'https://www.tottenhamhotspur.com',
    founded: 1882,
    clubColors: 'White / Navy Blue',
    venue: 'Tottenham Hotspur Stadium',
    squad: []
  },
  {
    id: 7,
    name: 'Barcelona',
    shortName: 'Barça',
    tla: 'FCB',
    crest: 'https://crests.football-data.org/81.png',
    address: 'Carrer d\'Arístides Maillol, s/n 08028 Barcelona',
    website: 'https://www.fcbarcelona.com',
    founded: 1899,
    clubColors: 'Blue / Garnet',
    venue: 'Spotify Camp Nou',
    squad: []
  },
  {
    id: 8,
    name: 'Real Madrid',
    shortName: 'Real Madrid',
    tla: 'RMA',
    crest: 'https://crests.football-data.org/86.png',
    address: 'Avenida de Concha Espina 1, 28036 Madrid',
    website: 'https://www.realmadrid.com',
    founded: 1902,
    clubColors: 'White / Purple',
    venue: 'Estadio Santiago Bernabéu',
    squad: []
  },
  {
    id: 9,
    name: 'Bayern Munich',
    shortName: 'Bayern',
    tla: 'FCB',
    crest: 'https://crests.football-data.org/5.png',
    address: 'Säbenerstraße 51 81547 München',
    website: 'https://www.fcbayern.de',
    founded: 1900,
    clubColors: 'Red / White / Blue',
    venue: 'Allianz Arena',
    squad: []
  },
  {
    id: 10,
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    tla: 'PSG',
    crest: 'https://crests.football-data.org/524.png',
    address: '24, rue du Commandant Guilbaud 75016 Paris',
    website: 'https://www.psg.fr',
    founded: 1970,
    clubColors: 'Blue / Red / White',
    venue: 'Parc des Princes',
    squad: []
  }
];

export const MOCK_PLAYERS = [
  {
    id: 1,
    name: 'Erling Haaland',
    position: 'Centre-Forward',
    dateOfBirth: '2000-07-21',
    nationality: 'Norway',
    team: 'Manchester City',
    shirtNumber: 9,
    marketValue: 180000000,
    attributes: {
      pace: 95,
      shooting: 94,
      passing: 75,
      dribbling: 85,
      defending: 45,
      physical: 88
    }
  },
  {
    id: 2,
    name: 'Kevin De Bruyne',
    position: 'Central Midfield',
    dateOfBirth: '1991-06-28',
    nationality: 'Belgium',
    team: 'Manchester City',
    shirtNumber: 17,
    marketValue: 85000000,
    attributes: {
      pace: 78,
      shooting: 88,
      passing: 95,
      dribbling: 90,
      defending: 65,
      physical: 75
    }
  },
  {
    id: 3,
    name: 'Mohamed Salah',
    position: 'Right Winger',
    dateOfBirth: '1992-06-15',
    nationality: 'Egypt',
    team: 'Liverpool',
    shirtNumber: 11,
    marketValue: 75000000,
    attributes: {
      pace: 93,
      shooting: 87,
      passing: 82,
      dribbling: 91,
      defending: 45,
      physical: 75
    }
  },
  {
    id: 4,
    name: 'Virgil van Dijk',
    position: 'Centre-Back',
    dateOfBirth: '1991-07-08',
    nationality: 'Netherlands',
    team: 'Liverpool',
    shirtNumber: 4,
    marketValue: 55000000,
    attributes: {
      pace: 82,
      shooting: 60,
      passing: 78,
      dribbling: 72,
      defending: 92,
      physical: 90
    }
  },
  {
    id: 5,
    name: 'Bukayo Saka',
    position: 'Right Winger',
    dateOfBirth: '2001-09-05',
    nationality: 'England',
    team: 'Arsenal',
    shirtNumber: 7,
    marketValue: 120000000,
    attributes: {
      pace: 88,
      shooting: 82,
      passing: 85,
      dribbling: 89,
      defending: 55,
      physical: 70
    }
  },
  {
    id: 6,
    name: 'Robert Lewandowski',
    position: 'Centre-Forward',
    dateOfBirth: '1988-08-21',
    nationality: 'Poland',
    team: 'Barcelona',
    shirtNumber: 9,
    marketValue: 40000000,
    attributes: {
      pace: 78,
      shooting: 93,
      passing: 80,
      dribbling: 85,
      defending: 45,
      physical: 82
    }
  },
  {
    id: 7,
    name: 'Jude Bellingham',
    position: 'Central Midfield',
    dateOfBirth: '2003-06-29',
    nationality: 'England',
    team: 'Real Madrid',
    shirtNumber: 5,
    marketValue: 150000000,
    attributes: {
      pace: 85,
      shooting: 82,
      passing: 88,
      dribbling: 90,
      defending: 78,
      physical: 85
    }
  },
  {
    id: 8,
    name: 'Kylian Mbappé',
    position: 'Centre-Forward',
    dateOfBirth: '1998-12-20',
    nationality: 'France',
    team: 'Real Madrid',
    shirtNumber: 7,
    marketValue: 180000000,
    attributes: {
      pace: 97,
      shooting: 90,
      passing: 80,
      dribbling: 94,
      defending: 45,
      physical: 78
    }
  },
  {
    id: 9,
    name: 'Harry Kane',
    position: 'Centre-Forward',
    dateOfBirth: '1993-07-28',
    nationality: 'England',
    team: 'Bayern Munich',
    shirtNumber: 9,
    marketValue: 100000000,
    attributes: {
      pace: 75,
      shooting: 92,
      passing: 85,
      dribbling: 82,
      defending: 50,
      physical: 80
    }
  },
  {
    id: 10,
    name: 'Lionel Messi',
    position: 'Right Winger',
    dateOfBirth: '1987-06-24',
    nationality: 'Argentina',
    team: 'Inter Miami',
    shirtNumber: 10,
    marketValue: 30000000,
    attributes: {
      pace: 85,
      shooting: 88,
      passing: 95,
      dribbling: 96,
      defending: 45,
      physical: 65
    }
  }
];
