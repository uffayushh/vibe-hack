import { motion } from 'motion/react';
import { Moon, Leaf, Flame, Star } from 'lucide-react';

type Evolution = 'dormant' | 'active' | 'radiant' | 'legendary';

interface EvolutionDisplayProps {
  currentEvolution: Evolution;
  auraLevel: number;
}

export function EvolutionDisplay({ currentEvolution, auraLevel }: EvolutionDisplayProps) {
  const evolutions: Array<{ stage: Evolution; name: string; icon: typeof Moon; minAura: number; color: string }> = [
    { stage: 'dormant', name: 'Dormant', icon: Moon, minAura: 0, color: 'text-slate-400' },
    { stage: 'active', name: 'Active', icon: Leaf, minAura: 25, color: 'text-green-500' },
    { stage: 'radiant', name: 'Radiant', icon: Flame, minAura: 60, color: 'text-orange-500' },
    { stage: 'legendary', name: 'Legendary', icon: Star, minAura: 90, color: 'text-purple-500' },
  ];

  const currentIndex = evolutions.findIndex((e) => e.stage === currentEvolution);
  const nextEvolution = evolutions[currentIndex + 1];

  return (
    <div className="space-y-4">
      {/* Evolution path */}
      <div className="flex items-center justify-between gap-2">
        {evolutions.map((evolution, index) => {
          const Icon = evolution.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={evolution.stage} className="flex items-center gap-2">
              <motion.div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600'
                    : 'bg-slate-800 border-2 border-slate-700'
                }`}
                animate={isCurrent ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Icon className={`w-6 h-6 ${isActive ? evolution.color : 'text-slate-600'}`} />
                
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}
              </motion.div>

              {index < evolutions.length - 1 && (
                <div className="w-8 h-0.5 bg-slate-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-slate-500 to-slate-600"
                    initial={{ width: '0%' }}
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current evolution info */}
      <div className="text-center">
        <h3 className={`text-2xl font-bold ${evolutions[currentIndex].color}`}>
          {evolutions[currentIndex].name}
        </h3>
        
        {nextEvolution && (
          <div className="mt-2">
            <p className="text-sm text-slate-400 mb-1">
              Next: {nextEvolution.name} ({nextEvolution.minAura} Aura)
            </p>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${Math.min(100, ((auraLevel - evolutions[currentIndex].minAura) / (nextEvolution.minAura - evolutions[currentIndex].minAura)) * 100)}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Abilities unlocked */}
      <div className="bg-slate-800 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">Abilities Unlocked:</h4>
        <div className="space-y-1 text-xs text-slate-400">
          {currentEvolution === 'dormant' && (
            <p>• Basic aura presence</p>
          )}
          {(currentEvolution === 'active' || currentEvolution === 'radiant' || currentEvolution === 'legendary') && (
            <>
              <p>• Aura affects nearby zones</p>
              <p>• Boost other players</p>
            </>
          )}
          {(currentEvolution === 'radiant' || currentEvolution === 'legendary') && (
            <>
              <p>• Create aura surges</p>
              <p>• Double zone rewards</p>
            </>
          )}
          {currentEvolution === 'legendary' && (
            <>
              <p>• Campus-wide aura influence</p>
              <p>• Legendary events unlock</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
