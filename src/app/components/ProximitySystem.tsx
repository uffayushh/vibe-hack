import { motion } from 'motion/react';

interface NearbyPlayer {
  id: string;
  name: string;
  aura: number;
  evolution: 'dormant' | 'active' | 'radiant' | 'legendary';
  distance: number;
}

interface ProximitySystemProps {
  nearbyPlayers: NearbyPlayer[];
  yourAura: number;
}

export function ProximitySystem({ nearbyPlayers, yourAura }: ProximitySystemProps) {
  const getEvolutionColor = (evolution: string) => {
    switch (evolution) {
      case 'dormant':
        return 'bg-slate-600';
      case 'active':
        return 'bg-green-500';
      case 'radiant':
        return 'bg-orange-500';
      case 'legendary':
        return 'bg-purple-500';
      default:
        return 'bg-slate-600';
    }
  };

  const calculateGroupEffect = () => {
    const avgAura = nearbyPlayers.length > 0
      ? nearbyPlayers.reduce((sum, p) => sum + p.aura, yourAura) / (nearbyPlayers.length + 1)
      : yourAura;

    if (avgAura >= 70) return { type: 'surge', boost: 15, color: 'text-green-400' };
    if (avgAura >= 40) return { type: 'stable', boost: 5, color: 'text-blue-400' };
    return { type: 'warning', boost: -5, color: 'text-orange-400' };
  };

  const groupEffect = calculateGroupEffect();

  return (
    <div className="space-y-4">
      {/* Group effect banner */}
      {nearbyPlayers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-slate-800 rounded-xl p-4 border-2 ${
            groupEffect.type === 'surge' ? 'border-green-500' :
            groupEffect.type === 'stable' ? 'border-blue-500' :
            'border-orange-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Group Aura Effect</p>
              <p className={`text-xl font-bold ${groupEffect.color}`}>
                {groupEffect.type === 'surge' && '⚡ Aura Surge!'}
                {groupEffect.type === 'stable' && '🌿 Stable Flow'}
                {groupEffect.type === 'warning' && '⚠️ Aura Drain'}
              </p>
            </div>
            <div className={`text-2xl font-bold ${groupEffect.color}`}>
              {groupEffect.boost > 0 ? '+' : ''}{groupEffect.boost}
            </div>
          </div>
        </motion.div>
      )}

      {/* Nearby players list */}
      <div className="bg-slate-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">
          Nearby Players ({nearbyPlayers.length})
        </h3>

        {nearbyPlayers.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">
            No players nearby. Explore zones to find others!
          </p>
        ) : (
          <div className="space-y-2">
            {nearbyPlayers.map((player) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-10 h-10 rounded-full ${getEvolutionColor(player.evolution)} flex items-center justify-center text-white font-bold`}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {player.name.charAt(0)}
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-white">{player.name}</p>
                    <p className="text-xs text-slate-400 capitalize">{player.evolution}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-white">{player.aura}</p>
                  <p className="text-xs text-slate-500">{player.distance}m away</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Interaction hint */}
      {nearbyPlayers.length > 0 && (
        <div className="text-xs text-slate-500 text-center">
          💡 High aura players boost the group. Stay together for bonuses!
        </div>
      )}
    </div>
  );
}
