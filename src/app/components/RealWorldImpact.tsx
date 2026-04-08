import { motion } from 'motion/react';
import { Droplet, Wind, Trees, TrendingUp } from 'lucide-react';

interface ImpactMetric {
  value: number;
  unit: string;
  comparison: string;
  icon: typeof Droplet;
  color: string;
  progress: number; // 0-100
}

interface RealWorldImpactProps {
  waterSaved: number; // liters
  carbonReduced: number; // kg
  wasteAvoided: number; // kg
}

export function RealWorldImpact({ waterSaved, carbonReduced, wasteAvoided }: RealWorldImpactProps) {
  const metrics: ImpactMetric[] = [
    {
      value: waterSaved,
      unit: 'L water',
      comparison: `${Math.round(waterSaved / 3)} person's daily drinking need`,
      icon: Droplet,
      color: 'from-blue-400 to-cyan-500',
      progress: Math.min(100, (waterSaved / 50) * 100), // Max 50L for full bar
    },
    {
      value: carbonReduced,
      unit: 'kg CO₂',
      comparison: `${Math.round(carbonReduced / 2.3)} km of driving avoided`,
      icon: Wind,
      color: 'from-green-400 to-emerald-500',
      progress: Math.min(100, (carbonReduced / 20) * 100), // Max 20kg for full bar
    },
    {
      value: wasteAvoided,
      unit: 'kg waste',
      comparison: `${Math.round(wasteAvoided / 0.5)} plastic bottles not created`,
      icon: Trees,
      color: 'from-purple-400 to-pink-500',
      progress: Math.min(100, (wasteAvoided / 10) * 100), // Max 10kg for full bar
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Today's Real Impact</h3>
          <p className="text-sm text-slate-400">Your actions translated to real-world results</p>
        </div>
        <TrendingUp className="w-5 h-5 text-green-400" />
      </div>

      {/* Impact Cards */}
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center flex-shrink-0`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-white">
                      {metric.value.toFixed(1)}
                    </span>
                    <span className="text-sm text-slate-400">{metric.unit}</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    = <span className="font-semibold text-white">{metric.comparison}</span>
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${metric.color}`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${metric.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total Impact Summary */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 border border-slate-700">
        <p className="text-xs text-slate-400 mb-2">This Week's Total</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-lg font-bold text-blue-400">{(waterSaved * 7).toFixed(0)}L</p>
            <p className="text-xs text-slate-500">Water</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-400">{(carbonReduced * 7).toFixed(0)}kg</p>
            <p className="text-xs text-slate-500">CO₂</p>
          </div>
          <div>
            <p className="text-lg font-bold text-purple-400">{(wasteAvoided * 7).toFixed(0)}kg</p>
            <p className="text-xs text-slate-500">Waste</p>
          </div>
        </div>
      </div>
    </div>
  );
}
