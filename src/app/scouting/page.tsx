'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateScoutReport, ScoutingReport, TeamStats, MOCK_TEAM_PRESETS } from '@/lib/scoutingLogic';

export default function ScoutingPage() {
  const [teamStats, setTeamStats] = useState<TeamStats>({
    name: '',
    midfield_passing: 70,
    midfield_buildup: 70,
    midfield_defense: 70,
    midfield_physicality: 70,
    defense_strength: 70,
    defense_pace: 70,
    attack_finishing: 70,
    attack_pace: 70,
    attack_creativity: 70,
    goalkeeping_quality: 70,
  });
  
  const [scoutingReport, setScoutingReport] = useState<ScoutingReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleStatChange = (stat: keyof TeamStats, value: string) => {
    const numValue = parseInt(value);
    if (numValue >= 0 && numValue <= 100) {
      setTeamStats(prev => ({
        ...prev,
        [stat]: numValue
      }));
    }
  };

  const handlePresetSelect = (presetName: string) => {
    if (presetName && MOCK_TEAM_PRESETS[presetName as keyof typeof MOCK_TEAM_PRESETS]) {
      setTeamStats(MOCK_TEAM_PRESETS[presetName as keyof typeof MOCK_TEAM_PRESETS]);
    }
  };

  const handleGenerateReport = async () => {
    if (!teamStats.name.trim()) {
      setError('Please enter a team name');
      return;
    }

    setLoading(true);
    setError('');
    setScoutingReport(null);

    try {
      const report = await generateScoutReport(teamStats);
      setScoutingReport(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <img 
            src="https://placehold.co/1200x300?text=Premier+League+Scouting+Analysis+with+Player+Recommendations" 
            alt="Premier League Scouting Analysis with Player Recommendations"
            className="w-full h-48 object-cover rounded-lg shadow-lg mb-6"
          />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Scouting Reports
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get intelligent player recommendations based on your team's statistical weaknesses. 
            Our advanced analysis identifies exactly what type of players your squad needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Team Stats Input */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Team Statistics</CardTitle>
                <CardDescription>
                  Enter your team's current statistical profile (0-100 scale)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Team Name and Preset */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input
                      id="teamName"
                      value={teamStats.name}
                      onChange={(e) => setTeamStats(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter team name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Load Preset Team</Label>
                    <Select onValueChange={handlePresetSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a preset team" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(MOCK_TEAM_PRESETS).map((teamName) => (
                          <SelectItem key={teamName} value={teamName}>
                            {teamName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="midfield" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="midfield">Midfield</TabsTrigger>
                    <TabsTrigger value="defense">Defense</TabsTrigger>
                    <TabsTrigger value="attack">Attack</TabsTrigger>
                    <TabsTrigger value="gk">GK</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="midfield" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Passing Ability ({teamStats.midfield_passing})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.midfield_passing}
                        onChange={(e) => handleStatChange('midfield_passing', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.midfield_passing)}`}>
                        {teamStats.midfield_passing >= 80 ? 'Excellent' : 
                         teamStats.midfield_passing >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Buildup Play ({teamStats.midfield_buildup})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.midfield_buildup}
                        onChange={(e) => handleStatChange('midfield_buildup', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.midfield_buildup)}`}>
                        {teamStats.midfield_buildup >= 80 ? 'Excellent' : 
                         teamStats.midfield_buildup >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Defensive Work ({teamStats.midfield_defense})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.midfield_defense}
                        onChange={(e) => handleStatChange('midfield_defense', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.midfield_defense)}`}>
                        {teamStats.midfield_defense >= 80 ? 'Excellent' : 
                         teamStats.midfield_defense >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Physicality ({teamStats.midfield_physicality})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.midfield_physicality}
                        onChange={(e) => handleStatChange('midfield_physicality', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.midfield_physicality)}`}>
                        {teamStats.midfield_physicality >= 80 ? 'Excellent' : 
                         teamStats.midfield_physicality >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="defense" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Defensive Strength ({teamStats.defense_strength})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.defense_strength}
                        onChange={(e) => handleStatChange('defense_strength', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.defense_strength)}`}>
                        {teamStats.defense_strength >= 80 ? 'Excellent' : 
                         teamStats.defense_strength >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Defensive Pace ({teamStats.defense_pace})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.defense_pace}
                        onChange={(e) => handleStatChange('defense_pace', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.defense_pace)}`}>
                        {teamStats.defense_pace >= 80 ? 'Excellent' : 
                         teamStats.defense_pace >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="attack" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Finishing ({teamStats.attack_finishing})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.attack_finishing}
                        onChange={(e) => handleStatChange('attack_finishing', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.attack_finishing)}`}>
                        {teamStats.attack_finishing >= 80 ? 'Excellent' : 
                         teamStats.attack_finishing >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Attacking Pace ({teamStats.attack_pace})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.attack_pace}
                        onChange={(e) => handleStatChange('attack_pace', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.attack_pace)}`}>
                        {teamStats.attack_pace >= 80 ? 'Excellent' : 
                         teamStats.attack_pace >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Creativity ({teamStats.attack_creativity})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.attack_creativity}
                        onChange={(e) => handleStatChange('attack_creativity', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.attack_creativity)}`}>
                        {teamStats.attack_creativity >= 80 ? 'Excellent' : 
                         teamStats.attack_creativity >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gk" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Goalkeeping Quality ({teamStats.goalkeeping_quality})</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={teamStats.goalkeeping_quality}
                        onChange={(e) => handleStatChange('goalkeeping_quality', e.target.value)}
                        className="w-full"
                      />
                      <div className={`text-sm font-medium ${getStatColor(teamStats.goalkeeping_quality)}`}>
                        {teamStats.goalkeeping_quality >= 80 ? 'Excellent' : 
                         teamStats.goalkeeping_quality >= 60 ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {error && (
                  <Alert className="border-destructive">
                    <AlertDescription className="text-destructive">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleGenerateReport}
                  disabled={loading || !teamStats.name.trim()}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Generating Report...' : 'Generate Scouting Report'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Scouting Report */}
          <div>
            {scoutingReport && (
              <div className="space-y-6">
                {/* Team Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Team Analysis</CardTitle>
                    <CardDescription>
                      Overall balance: {scoutingReport.team_analysis.overall_balance}/100
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>
                      <ul className="space-y-1">
                        {scoutingReport.team_analysis.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600 mb-2">Weaknesses</h3>
                      <ul className="space-y-1">
                        {scoutingReport.team_analysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Priority Needs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Priority Transfer Targets</CardTitle>
                    <CardDescription>
                      Critical positions that need immediate attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scoutingReport.priority_needs.length > 0 ? (
                      scoutingReport.priority_needs.map((need, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{need.position}</h3>
                            <Badge className={`${getUrgencyColor(need.urgency)} text-white`}>
                              {need.urgency} Priority
                            </Badge>
                          </div>
                          <div className="mb-2">
                            <span className="text-sm font-medium">Player Type: </span>
                            <span className="text-sm text-muted-foreground">{need.player_type}</span>
                          </div>
                          <div className="mb-2">
                            <span className="text-sm font-medium">Key Attributes: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {need.key_attributes.map((attr, attrIndex) => (
                                <Badge key={attrIndex} variant="outline" className="text-xs">
                                  {attr}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{need.reasoning}</p>
                          {need.suggested_players && (
                            <div>
                              <span className="text-sm font-medium">Suggested Players: </span>
                              <span className="text-sm text-muted-foreground">
                                {need.suggested_players.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No critical needs identified. Your squad has good balance!</p>
                    )}
                  </CardContent>
                </Card>

                {/* Secondary Needs */}
                {scoutingReport.secondary_needs.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Secondary Improvements</CardTitle>
                      <CardDescription>
                        Areas for potential upgrades and squad depth
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {scoutingReport.secondary_needs.map((need, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{need.position}</h3>
                            <Badge className={`${getUrgencyColor(need.urgency)} text-white`}>
                              {need.urgency} Priority
                            </Badge>
                          </div>
                          <div className="mb-2">
                            <span className="text-sm font-medium">Player Type: </span>
                            <span className="text-sm text-muted-foreground">{need.player_type}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{need.reasoning}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Tactical Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tactical Recommendations</CardTitle>
                    <CardDescription>
                      Suggested formation: {scoutingReport.recommended_formation}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {scoutingReport.tactical_suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {!scoutingReport && (
              <Card>
                <CardHeader>
                  <CardTitle>Scouting Report</CardTitle>
                  <CardDescription>
                    Enter your team statistics to generate a detailed scouting report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-muted-foreground">
                      Fill in your team's statistics and click "Generate Scouting Report" to get personalized player recommendations.
                    </p>
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
