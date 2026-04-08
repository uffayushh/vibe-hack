import { motion } from 'motion/react';
import { Trophy, TrendingUp, Users, Crown } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  score: number;
  members: number;
  trend: 'up' | 'down' | 'stable';
}

interface CompetitionsProps {
  userTeam: string;
  timeRemaining: string;
}

export function Competitions({ userTeam, timeRemaining }: CompetitionsProps) {
  const blockCompetition: Team[] = [
    { id: '1', name: "Boy's Block 3", score: 1450, members: 110, trend: 'up' },
    { id: '2', name: "Girl's Block 1", score: 1380, members: 95, trend: 'up' },
    { id: '3', name: "Boy's Block 1", score: 1250, members: 105, trend: 'down' },
    { id: '4', name: "Girl's Block 2", score: 1180, members: 88, trend: 'up' },
    { id: '5', name: "Boy's Block 2", score: 1050, members: 100, trend: 'stable' },
    { id: '6', name: "Boy's Block 4", score: 980, members: 98, trend: 'down' },
    { id: '7', name: "Boy's Block 5", score: 890, members: 92, trend: 'stable' },
    { id: '8', name: "Boy's Block 6", score: 820, members: 85, trend: 'down' },
    { id: '9', name: "Boy's Block 7", score: 760, members: 80, trend: 'stable' },
    { id: '10', name: "Boy's Block 8", score: 650, members: 75, trend: 'down' },
  ];

  const facultyCompetition: Team[] = [
    { id: '1', name: 'Engineering', score: 2340, members: 120, trend: 'up' },
    { id: '2', name: 'Business', score: 2290, members: 115, trend: 'up' },
    { id: '3', name: 'Sciences', score: 2100, members: 95, trend: 'stable' },
    { id: '4', name: 'Architecture', score: 1950, members: 88, trend: 'down' },
  ];

  const getRankColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600';
    if (index === 1) return 'from-slate-300 to-slate-400';
    if (index === 2) return 'from-orange-400 to-orange-600';
    return 'from-slate-600 to-slate-700';
  };

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-400" />;
    if (trend === 'down') return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
    return <span className="w-3 h-3 text-blue-400">−</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Weekly Competitions
          </h3>
          <p className="text-sm text-slate-400">Time remaining: {timeRemaining}</p>
        </div>
      </div>

      {/* Block vs Block */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 max-h-[400px] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4 sticky top-0 bg-slate-900 py-2 z-10">
          <Users className="w-4 h-4 text-purple-400" />
          <h4 className="font-bold text-white">Block vs Block</h4>
        </div>

        <div className="space-y-2">
          {blockCompetition.map((team, index) => {
            const isUserTeam = team.name === userTeam;
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isUserTeam ? 'bg-purple-900/30 border-2 border-purple-500' : 'bg-slate-800'
                }`}
              >
                {/* Rank Badge */}
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(index)} flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0`}
                >
                  {getRankEmoji(index)}
                </div>

                {/* Team Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{team.name}</p>
                    {isUserTeam && (
                      <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{team.members} members</p>
                </div>

                {/* Score & Trend */}
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <p className="font-bold text-white">{team.score}</p>
                    {getTrendIcon(team.trend)}
                  </div>
                  <p className="text-xs text-slate-500">Aura Points</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Faculty Competition */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-4 h-4 text-yellow-400" />
          <h4 className="font-bold text-white">Faculty Challenge</h4>
        </div>

        <div className="space-y-2">
          {facultyCompetition.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800"
            >
              {/* Rank Badge */}
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(index)} flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0`}
              >
                {getRankEmoji(index)}
              </div>

              {/* Team Info */}
              <div className="flex-1">
                <p className="font-semibold text-white">{team.name}</p>
                <p className="text-xs text-slate-400">{team.members} students</p>
              </div>

              {/* Score & Trend */}
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <p className="font-bold text-white">{team.score}</p>
                  {getTrendIcon(team.trend)}
                </div>
                <p className="text-xs text-slate-500">Aura Points</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competition Rewards */}
      <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-4 border border-yellow-600/30">
        <h4 className="text-sm font-bold text-yellow-400 mb-2">🏆 This Week's Prizes</h4>
        <div className="space-y-1 text-xs text-slate-300">
          <p>🥇 1st Place: +100 Aura to all members + Legendary Status</p>
          <p>🥈 2nd Place: +50 Aura to all members</p>
          <p>🥉 3rd Place: +25 Aura to all members</p>
        </div>
      </div>
    </div>
  );
}
