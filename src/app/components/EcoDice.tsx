import { motion } from 'motion/react';
import { useState } from 'react';
import { Dices } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface EcoDiceProps {
  onChallengeRoll: (challenge: Challenge) => void;
  canRoll: boolean;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Light Hunter',
    description: 'Turn off 3 unused lights in your building',
    reward: 20,
    difficulty: 'easy',
  },
  {
    id: '2',
    title: 'Recycle Champion',
    description: 'Sort and recycle 10 items correctly',
    reward: 30,
    difficulty: 'easy',
  },
  {
    id: '3',
    title: 'Water Warrior',
    description: 'Use refill stations instead of bottles for the day',
    reward: 25,
    difficulty: 'easy',
  },
  {
    id: '4',
    title: 'Influence Master',
    description: 'Convince 2 friends to join an eco-activity',
    reward: 50,
    difficulty: 'medium',
  },
  {
    id: '5',
    title: 'Energy Saver',
    description: 'Reduce your area\'s energy use by 15% today',
    reward: 40,
    difficulty: 'medium',
  },
  {
    id: '6',
    title: 'Green Squad',
    description: 'Form a group of 5 and complete a zone together',
    reward: 60,
    difficulty: 'medium',
  },
  {
    id: '7',
    title: 'Campus Legend',
    description: 'Maintain 90+ Aura for 24 hours straight',
    reward: 100,
    difficulty: 'hard',
  },
  {
    id: '8',
    title: 'Zero Waste Day',
    description: 'Create no landfill waste for an entire day',
    reward: 80,
    difficulty: 'hard',
  },
];

export function EcoDice({ onChallengeRoll, canRoll }: EcoDiceProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);

  const handleRoll = () => {
    if (!canRoll || isRolling) return;

    setIsRolling(true);
    setCurrentChallenge(null);

    // Simulate dice roll animation
    setTimeout(() => {
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      setCurrentChallenge(randomChallenge);
      setIsRolling(false);
      onChallengeRoll(randomChallenge);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Dices className="w-5 h-5" />
        Eco Dice Challenge
      </h3>

      <div className="text-center space-y-4">
        {/* Dice button */}
        <motion.button
          onClick={handleRoll}
          disabled={!canRoll || isRolling}
          className={`w-32 h-32 mx-auto rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${
            canRoll && !isRolling
              ? 'bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 cursor-pointer'
              : 'bg-slate-700 cursor-not-allowed opacity-50'
          }`}
          whileHover={canRoll && !isRolling ? { scale: 1.05 } : {}}
          whileTap={canRoll && !isRolling ? { scale: 0.95 } : {}}
          animate={isRolling ? {
            rotate: [0, 360, 720, 1080],
            scale: [1, 1.1, 1, 1.1, 1],
          } : {}}
          transition={isRolling ? {
            duration: 1.5,
            ease: 'easeInOut',
          } : {}}
        >
          <Dices className="w-16 h-16" />
        </motion.button>

        {/* Status text */}
        {!canRoll && !isRolling && (
          <p className="text-sm text-slate-400">
            Complete current challenge to roll again
          </p>
        )}

        {isRolling && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white font-semibold"
          >
            Rolling...
          </motion.p>
        )}

        {/* Current challenge display */}
        {currentChallenge && !isRolling && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-lg p-4 text-left"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-base font-semibold text-white">{currentChallenge.title}</h4>
              <span className={`text-xs font-bold uppercase ${getDifficultyColor(currentChallenge.difficulty)}`}>
                {currentChallenge.difficulty}
              </span>
            </div>
            <p className="text-sm text-slate-300 mb-3">{currentChallenge.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Reward:</span>
              <span className="text-lg font-bold text-green-400">+{currentChallenge.reward} Aura</span>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        {!currentChallenge && !isRolling && canRoll && (
          <p className="text-xs text-slate-500">
            Tap the dice to receive a random eco-challenge!
          </p>
        )}
      </div>
    </div>
  );
}
