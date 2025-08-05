# Premier League Analytics Hub

A comprehensive Premier League analytics platform featuring accurate score prediction, intelligent squad building, and advanced scouting reports. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### 1. Score Predictor
- **Accurate Match Predictions**: Advanced algorithms analyze team performance, head-to-head records, and current form
- **Statistical Analysis**: Goals scored/conceded, wins/draws/losses analysis
- **Form Factor**: Recent 5 games weighted heavily in predictions
- **Home Advantage**: Statistical boost for home teams
- **Win Probabilities**: Detailed breakdown of home win, draw, and away win chances
- **Confidence Ratings**: Prediction confidence based on data quality and consistency

### 2. Squad Builder
- **Custom Team Creation**: Select from a database of Premier League players
- **League Position Prediction**: See where your custom squad would finish in the table
- **Squad Balance Analysis**: Detailed breakdown of attack, midfield, defense, and goalkeeping strength
- **Strengths & Weaknesses**: Comprehensive analysis of your team's capabilities
- **Position Requirements**: Validates proper squad composition (minimum players per position)
- **Confidence Metrics**: Prediction confidence based on squad balance and quality

### 3. Scouting System
- **Intelligent Player Recommendations**: AI-powered suggestions based on team statistical weaknesses
- **Priority Transfer Targets**: Critical positions that need immediate attention
- **Secondary Improvements**: Areas for potential upgrades and squad depth
- **Tactical Analysis**: Formation recommendations and tactical suggestions
- **Team Presets**: Pre-configured stats for existing Premier League teams
- **Custom Team Analysis**: Input your own team's statistical profile

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Source**: Football-Data.org API (free tier)
- **Validation**: Zod for API request validation

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Football-Data.org API key (free tier available)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd premier-league-analytics
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
# Football Data API Configuration
FOOTBALL_DATA_API_KEY=your_football_data_api_key_here
```

**To get your API key:**
1. Visit [Football-Data.org](https://www.football-data.org/)
2. Sign up for a free account
3. Navigate to your dashboard to get your API key
4. Free tier includes 10 requests per minute

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

## 🧪 API Testing

Test the score prediction API endpoint:

```bash
# Test the API endpoint
curl -X POST http://localhost:8000/api/score-prediction \
  -H "Content-Type: application/json" \
  -d '{"homeTeam": "Manchester City", "awayTeam": "Arsenal"}' \
  -w "\nHTTP: %{http_code}\nTime: %{time_total}s\n" | jq '.'

# Expected response format:
{
  "success": true,
  "data": {
    "homeTeam": "Manchester City",
    "awayTeam": "Arsenal",
    "predictedHomeScore": 2,
    "predictedAwayScore": 1,
    "confidence": 78,
    "winProbability": {
      "home": 65,
      "draw": 20,
      "away": 15
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 📊 How It Works

### Score Prediction Algorithm
1. **Statistical Analysis**: Analyzes goals for/against, wins/draws/losses
2. **Form Factor**: Recent 5 games weighted with decreasing importance
3. **Home Advantage**: 30% statistical boost for home teams
4. **Attacking/Defensive Strength**: Calculated based on goals per game ratios
5. **Confidence Calculation**: Based on form consistency and data quality

### Squad Analysis Algorithm
1. **Position Validation**: Ensures proper squad composition
2. **Weighted Ratings**: Different positions weighted by importance
3. **Depth Bonus**: Additional points for squad depth beyond 11 players
4. **Age Balance**: Optimal age range (24-30) receives bonus points
5. **League Position Mapping**: Overall rating mapped to realistic league positions

### Scouting Logic
1. **Statistical Gap Analysis**: Identifies weaknesses in team stats
2. **Priority Assessment**: Critical needs vs. secondary improvements
3. **Player Type Matching**: Recommends specific player archetypes
4. **Tactical Suggestions**: Formation and strategy recommendations
5. **Urgency Classification**: High/Medium/Low priority system

## 🎯 Usage Examples

### Score Predictor
1. Navigate to `/score-predictor`
2. Select home and away teams from dropdowns
3. Click "Predict Match" to get detailed analysis
4. View predicted score, win probabilities, and confidence rating

### Squad Builder
1. Go to `/squad-builder`
2. Select players from the available database
3. Ensure minimum requirements (1 GK, 3 DEF, 3 MID, 1 FWD)
4. Click "Analyze Squad" for detailed breakdown
5. View predicted league position and team analysis

### Scouting Reports
1. Visit `/scouting`
2. Enter team name and adjust statistical sliders (0-100 scale)
3. Use preset teams or create custom profiles
4. Generate report to see priority transfer targets
5. Review tactical recommendations and formation suggestions

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── score-prediction/
│   │       └── route.ts          # Score prediction API endpoint
│   ├── score-predictor/
│   │   └── page.tsx              # Score prediction interface
│   ├── squad-builder/
│   │   └── page.tsx              # Squad building interface
│   ├── scouting/
│   │   └── page.tsx              # Scouting reports interface
│   ├── layout.tsx                # Root layout with navigation
│   └── page.tsx                  # Homepage
├── lib/
│   ├── scorePredictor.ts         # Score prediction logic
│   ├── squadPredictor.ts         # Squad analysis algorithms
│   ├── scoutingLogic.ts          # Scouting recommendation engine
│   └── utils.ts                  # Utility functions
└── components/
    └── ui/                       # shadcn/ui components
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration for consistent theming. Colors and spacing follow the shadcn/ui design system.

### API Rate Limiting
The free tier of Football-Data.org allows 10 requests per minute. The application includes error handling for rate limit scenarios.

### Environment Variables
- `FOOTBALL_DATA_API_KEY`: Your Football-Data.org API key

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Football-Data.org](https://www.football-data.org/) for providing Premier League data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Built with ❤️ for Premier League fans and data enthusiasts**



