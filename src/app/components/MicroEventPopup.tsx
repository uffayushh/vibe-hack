import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';

interface MicroEvent {
  id: string;
  title: string;
  description: string;
  reward: number;
  timeLeft: number; // in seconds
  type: 'energy' | 'water' | 'recycle' | 'social';
}

interface MicroEventPopupProps {
  event: MicroEvent | null;
  onAccept: () => void;
  onDismiss: () => void;
}

export function MicroEventPopup({ event, onAccept, onDismiss }: MicroEventPopupProps) {
  if (!event) return null;

  const getEventColor = () => {
    switch (event.type) {
      case 'energy':
        return 'from-yellow-500 to-orange-600';
      case 'water':
        return 'from-blue-500 to-cyan-600';
      case 'recycle':
        return 'from-green-500 to-emerald-600';
      case 'social':
        return 'from-purple-500 to-pink-600';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
      >
        <div className="relative bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${getEventColor()} opacity-20`}
            animate={{
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Content */}
          <div className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Micro-Event!</h3>
              </div>
              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h4 className="text-lg font-semibold text-white mb-2">{event.title}</h4>
            <p className="text-slate-300 text-sm mb-4">{event.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <span className="text-slate-400">Reward: </span>
                <span className="text-green-400 font-bold">+{event.reward} Aura</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-400">Time: </span>
                <span className="text-orange-400 font-bold">{Math.floor(event.timeLeft / 60)}:{(event.timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            <motion.button
              onClick={onAccept}
              className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${getEventColor()} text-white font-bold shadow-lg`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Accept Challenge
            </motion.button>
          </div>

          {/* Timer bar */}
          <motion.div
            className={`h-1 bg-gradient-to-r ${getEventColor()}`}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{
              duration: event.timeLeft,
              ease: 'linear',
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
