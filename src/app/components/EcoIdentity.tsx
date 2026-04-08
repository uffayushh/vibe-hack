import { motion } from 'motion/react';
import { Award, Droplet, Wind, Recycle, Crown, Star, Shield } from 'lucide-react';

interface Title {
  id: string;
  name: string;
  icon: typeof Award;
  earned: boolean;
  progress: number;
  requirement: string;
  color: string;
}

interface EcoIdentityProps {
  currentTitle: string;
  campusRank: number;
  totalUsers: number;
}

export function EcoIdentity({ currentTitle, campusRank, totalUsers }: EcoIdentityProps) {
  const titles: Title[] = [
    {
      id: '1',
      name: 'Water Saver',
      icon: Droplet,
      earned: true,
      progress: 100,
      requirement: 'Save 50L of water',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: '2',
      name: 'Carbon Ninja',
      icon: Wind,
      earned: true,
      progress: 100,
      requirement: 'Reduce 20kg CO₂',
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: '3',
      name: 'Zero-Waste Pro',
      icon: Recycle,
      earned: false,
      progress: 65,
      requirement: 'Avoid 10kg waste',
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: '4',
      name: 'Eco Champion',
      icon: Crown,
      earned: false,
      progress: 40,
      requirement: 'Reach Radiant evolution',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: '5',
      name: 'Campus Legend',
      icon: Star,
      earned: false,
      progress: 15,
      requirement: 'Top 10 on leaderboard',
      color: 'from-indigo-400 to-purple-500',
    },
    {
      id: '6',
      name: 'Earth Guardian',
      icon: Shield,
      earned: false,
      progress: 8,
      requirement: 'Earn all other titles',
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  const getRankSuffix = (rank: number) => {
    if (rank % 10 === 1 && rank % 100 !== 11) return 'st';
    if (rank % 10 === 2 && rank % 100 !== 12) return 'nd';
    if (rank % 10 === 3 && rank % 100 !== 13) return 'rd';
    return 'th';
  };

  const getRankColor = () => {
    if (campusRank <= 10) return 'from-yellow-400 to-yellow-600';
    if (campusRank <= 50) return 'from-purple-400 to-purple-600';
    if (campusRank <= 100) return 'from-blue-400 to-blue-600';
    return 'from-slate-400 to-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Current Identity Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border-2 border-slate-700">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Your Eco-Identity</p>
              <h3 className="text-2xl font-bold text-white">{currentTitle}</h3>
            </div>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Award className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </div>

          {/* Campus Rank */}
          <div className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${getRankColor()} shadow-lg`}>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-white" />
              <div>
                <p className="text-sm font-bold text-white">
                  #{campusRank}
                  <sup className="text-xs">{getRankSuffix(campusRank)}</sup>
                </p>
                <p className="text-xs text-white opacity-80">of {totalUsers} students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title Collection */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          Title Collection
        </h4>

        <div className="space-y-3">
          {titles.map((title, index) => {
            const Icon = title.icon;
            return (
              <motion.div
                key={title.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border-2 ${
                  title.earned
                    ? `bg-gradient-to-r ${title.color} bg-opacity-10 border-opacity-50`
                    : 'bg-slate-800 border-slate-700'
                }`}
                style={title.earned ? { borderColor: 'currentColor' } : {}}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <motion.div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      title.earned ? `bg-gradient-to-br ${title.color}` : 'bg-slate-700'
                    }`}
                    animate={title.earned ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Icon className={`w-5 h-5 ${title.earned ? 'text-white' : 'text-slate-500'}`} />
                  </motion.div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-semibold ${title.earned ? 'text-white' : 'text-slate-400'}`}>
                        {title.name}
                      </p>
                      {title.earned && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                          Earned
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{title.requirement}</p>

                    {/* Progress Bar */}
                    {!title.earned && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-500">Progress</span>
                          <span className="text-xs text-slate-400 font-bold">{title.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${title.color}`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${title.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    )}

                    {title.earned && (
                      <p className="text-xs text-green-400 flex items-center gap-1">
                        <span>✓</span> Unlocked!
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Public Recognition */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4 border border-purple-600/30">
        <h4 className="text-sm font-bold text-purple-400 mb-2">📍 Public Recognition</h4>
        <p className="text-xs text-slate-300 mb-2">
          Your rank and titles are displayed on campus leaderboard screens
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">Live on 5 screens</span>
        </div>
      </div>
    </div>
  );
}
