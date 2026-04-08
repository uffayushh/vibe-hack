import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface GlobalStateProps {
  globalAuraLevel: number;
  trend: 'up' | 'down' | 'stable';
  activeUsers: number;
}

export function GlobalState({ globalAuraLevel, trend, activeUsers }: GlobalStateProps) {
  const getStateDescription = () => {
    if (globalAuraLevel >= 70) {
      return {
        title: '🌟 Campus Thriving',
        description: 'Amazing collective effort! The environment is vibrant.',
        color: 'from-green-400 to-emerald-500',
        bgColor: 'bg-green-900/20',
      };
    } else if (globalAuraLevel >= 40) {
      return {
        title: '🌿 Campus Active',
        description: 'Good progress. Keep the momentum going!',
        color: 'from-blue-400 to-cyan-500',
        bgColor: 'bg-blue-900/20',
      };
    } else {
      return {
        title: '🌫️ Campus Struggling',
        description: 'Collective action needed. Every contribution matters.',
        color: 'from-orange-400 to-red-500',
        bgColor: 'bg-orange-900/20',
      };
    }
  };

  const state = getStateDescription();

  return (
    <div className="space-y-4">
      {/* Main global state card */}
      <div className={`rounded-xl p-6 ${state.bgColor} border border-slate-700`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{state.title}</h3>
            <p className="text-sm text-slate-300">{state.description}</p>
          </div>
          <div className="flex items-center gap-1">
            {trend === 'up' && <TrendingUp className="w-5 h-5 text-green-400" />}
            {trend === 'down' && <TrendingDown className="w-5 h-5 text-red-400" />}
            {trend === 'stable' && <AlertCircle className="w-5 h-5 text-blue-400" />}
          </div>
        </div>

        {/* Global aura level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Campus Aura</span>
            <span className="text-white font-bold">{Math.round(globalAuraLevel)}/100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${state.color}`}
              initial={{ width: '0%' }}
              animate={{ width: `${globalAuraLevel}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Active users */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-400">Active Players</span>
          <motion.span
            className="text-white font-bold"
            key={activeUsers}
            initial={{ scale: 1.3, color: '#22c55e' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.3 }}
          >
            {activeUsers}
          </motion.span>
        </div>
      </div>

      {/* Real-time effects visualization */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Zone Multiplier</p>
          <p className="text-lg font-bold text-white">
            {globalAuraLevel >= 70 ? '2x' : globalAuraLevel >= 40 ? '1.5x' : '1x'}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Event Frequency</p>
          <p className="text-lg font-bold text-white">
            {globalAuraLevel >= 70 ? 'High' : globalAuraLevel >= 40 ? 'Normal' : 'Low'}
          </p>
        </div>
      </div>

      {/* Environmental feedback */}
      <div className="bg-slate-900 rounded-lg p-4 text-center">
        <p className="text-xs text-slate-400 mb-2">Campus Environment</p>
        <div className="flex items-center justify-center gap-2">
          {globalAuraLevel >= 70 && (
            <>
              <span className="text-2xl">🌱</span>
              <span className="text-2xl">✨</span>
              <span className="text-2xl">🌞</span>
            </>
          )}
          {globalAuraLevel >= 40 && globalAuraLevel < 70 && (
            <>
              <span className="text-2xl">🌿</span>
              <span className="text-2xl">☁️</span>
            </>
          )}
          {globalAuraLevel < 40 && (
            <>
              <span className="text-2xl">🌫️</span>
              <span className="text-2xl">🌧️</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
