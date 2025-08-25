'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Player, MOCK_PLAYERS, predictLeaguePlacement, SquadAnalysis } from '@/lib/squadPredictor';

export default function SquadBuilderPage() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [analysis, setAnalysis] = useState<SquadAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handlePlayerToggle = (player: Player) => {
    setSelectedPlayers(prev => {
      const isSelected = prev.some(p => p.id === player.id);
      if (isSelected) {
        return prev.filter(p => p.id !== player.id);
      } else {
        return [...prev, player];
      }
    });
  };

  const handleAnalyzeSquad = async () => {
    if (selectedPlayers.length < 11) {
      setError('Please select at least 11 players');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const result = await predictLeaguePlacement(selectedPlayers);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getPositionCount = (position: string) => {
    return selectedPlayers.filter(p => p.position === position).length;
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK': return 'bg-yellow-500';
      case 'DEF': return 'bg-blue-500';
      case 'MID': return 'bg-green-500';
      case 'FWD': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPositionName = (position: string) => {
    switch (position) {
      case 'GK': return 'Goalkeeper';
      case 'DEF': return 'Defender';
      case 'MID': return 'Midfielder';
      case 'FWD': return 'Forward';
      default: return position;
    }
  };

  const getPositionSuffix = (position: number) => {
    if (position === 1) return 'st';
    if (position === 2) return 'nd';
    if (position === 3) return 'rd';
    return 'th';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <img 
            src="https://placehold.co/1200x300?text=Premier+League+Squad+Builder+with+Formation+Analysis" 
            alt="Premier League Squad Builder with Formation Analysis"
            className="w-full h-48 object-cover rounded-lg shadow-lg mb-6"
          />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Squad Builder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build your dream Premier League squad and discover where they would finish in the table. 
            Select players and get detailed analysis of your team's potential.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Players</CardTitle>
                <CardDescription>
                  Choose players for your squad (minimum 11, maximum 25)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Squad Summary */}
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Squad Size: {selectedPlayers.length}/25</span>
                    <Button 
                      onClick={() => setSelectedPlayers([])} 
                      variant="outline" 
                      size="sm"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">GK</div>
                      <div className={`text-lg font-bold ${getPositionCount('GK') >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                        {getPositionCount('GK')}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">DEF</div>
                      <div className={`text-lg font-bold ${getPositionCount('DEF') >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                        {getPositionCount('DEF')}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">MID</div>
                      <div className={`text-lg font-bold ${getPositionCount('MID') >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                        {getPositionCount('MID')}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">FWD</div>
                      <div className={`text-lg font-bold ${getPositionCount('FWD') >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                        {getPositionCount('FWD')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {MOCK_PLAYERS.map((player) => {
                    const isSelected = selectedPlayers.some(p => p.id === player.id);
                    return (
                      <div
                        key={player.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handlePlayerToggle(player)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{player.name}</h3>
                              <Badge 
                                variant="secondary" 
                                className={`${getPositionColor(player.position)} text-white`}
                              >
                                {player.position}
                              </Badge>
                              <Badge variant="outline">
                                {player.overall_rating} OVR
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Age: {player.age} | Value: £{(player.market_value / 1000000).toFixed(1)}M
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm space-y-1">
                              <div>PAC: {player.pace}</div>
                              <div>SHO: {player.shooting}</div>
                              <div>PAS: {player.passing}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Panel */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Squad Analysis</CardTitle>
                <CardDescription>
                  Analyze your squad's potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert className="border-destructive mb-4">
                    <AlertDescription className="text-destructive">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleAnalyzeSquad}
                  disabled={loading || selectedPlayers.length < 11}
                  className="w-full mb-4"
                  size="lg"
                >
                  {loading ? 'Analyzing...' : 'Analyze Squad'}
                </Button>

                {analysis && (
                  <div className="space-y-6">
                    {/* League Position */}
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {analysis.predicted_position}{getPositionSuffix(analysis.predicted_position)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Predicted League Position
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Range: {analysis.position_range.best_case}{getPositionSuffix(analysis.position_range.best_case)} - {analysis.position_range.worst_case}{getPositionSuffix(analysis.position_range.worst_case)}
                      </div>
                    </div>

                    {/* Overall Rating */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Overall Rating</span>
                        <span className="font-bold">{analysis.overall_rating}/100</span>
                      </div>
                      <Progress value={analysis.overall_rating} className="h-2" />
                    </div>

                    {/* Squad Balance */}
                    <div>
                      <h3 className="font-semibold mb-3">Squad Balance</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Attack</span>
                            <span>{analysis.squad_balance.attack}</span>
                          </div>
                          <Progress value={analysis.squad_balance.attack} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Midfield</span>
                            <span>{analysis.squad_balance.midfield}</span>
                          </div>
                          <Progress value={analysis.squad_balance.midfield} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Defense</span>
                            <span>{analysis.squad_balance.defense}</span>
                          </div>
                          <Progress value={analysis.squad_balance.defense} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Goalkeeping</span>
                            <span>{analysis.squad_balance.goalkeeping}</span>
                          </div>
                          <Progress value={analysis.squad_balance.goalkeeping} className="h-1" />
                        </div>
                      </div>
                    </div>

                    {/* Confidence */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Prediction Confidence</span>
                        <span className="font-bold">{analysis.confidence}%</span>
                      </div>
                      <Progress value={analysis.confidence} className="h-2" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle>Team Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>
                    <ul className="space-y-1">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-600 mb-2">Weaknesses</h3>
                    <ul className="space-y-1">
                      {analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
