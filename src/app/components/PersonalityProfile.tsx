import { motion } from 'motion/react';
import { Leaf, Recycle, Zap, Target, Bell } from 'lucide-react';

type PersonalityType = 'minimalist' | 'recycler' | 'energySaver';

interface PersonalityProfileProps {
  personality: PersonalityType;
  completedGoals: number;
  totalGoals: number;
}

const personalityData = {
  minimalist: {
    name: 'The Minimalist',
    icon: Leaf,
    color: 'from-green-400 to-emerald-500',
    description: 'You believe in doing more with less. Quality over quantity.',
    traits: ['Intentional living', 'Waste reduction', 'Mindful consumption'],
    goals: [
      { id: '1', text: 'Use reusables for all meals today', reward: 20 },
      { id: '2', text: 'Go a full day without single-use items', reward: 30 },
      { id: '3', text: 'Convince 2 friends to bring reusable bags', reward: 25 },
    ],
    nudges: [
      'Your reusable bottle just saved another plastic bottle from existing! 💚',
      'That\'s 5 days without buying bottled drinks. You\'re a minimalist legend!',
      'Simple living = powerful impact. Keep it up!',
    ],
  },
  recycler: {
    name: 'The Recycler',
    icon: Recycle,
    color: 'from-blue-400 to-cyan-500',
    description: 'You see value in what others throw away. Every item deserves a second life.',
    traits: ['Sorting expert', 'Zero waste advocate', 'Circular economy champion'],
    goals: [
      { id: '1', text: 'Correctly sort 15 items at recycling stations', reward: 20 },
      { id: '2', text: 'Help 3 people learn proper recycling', reward: 30 },
      { id: '3', text: 'Find creative reuse for something broken', reward: 25 },
    ],
    nudges: [
      'You just kept 500g of plastic out of the ocean! 🌊',
      'Your recycling skills are inspiring others. Nice work!',
      'That compost you sorted will become new soil in 6 weeks!',
    ],
  },
  energySaver: {
    name: 'The Energy Saver',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    description: 'You think in kilowatts and carbon footprints. Efficiency is your superpower.',
    traits: ['Power conscious', 'Carbon calculator', 'Climate warrior'],
    goals: [
      { id: '1', text: 'Turn off 10 unused devices around campus', reward: 20 },
      { id: '2', text: 'Reduce your area\'s energy use by 20%', reward: 30 },
      { id: '3', text: 'Take the stairs instead of elevator 5 times', reward: 15 },
    ],
    nudges: [
      'You just saved enough energy to charge 50 phones! ⚡',
      'Your dorm\'s energy use is down 8% this week. That\'s you!',
      'Walking beats elevators: 0kg CO₂ vs 0.08kg per floor!',
    ],
  },
};

export function PersonalityProfile({ personality, completedGoals, totalGoals }: PersonalityProfileProps) {
  const profile = personalityData[personality];
  const Icon = profile.icon;
  const randomNudge = profile.nudges[Math.floor(Math.random() * profile.nudges.length)];

  return (
    <div className="space-y-6">
      {/* Personality Header */}
      <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-6 border-2 border-slate-700">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${profile.color} opacity-10`}
          animate={{
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative flex items-start gap-4">
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-lg`}
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">{profile.name}</h3>
            <p className="text-sm text-slate-300 mb-3">{profile.description}</p>

            <div className="flex flex-wrap gap-2">
              {profile.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Goals */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Goals
          </h4>
          <span className="text-sm text-slate-400">
            {completedGoals}/{totalGoals} completed
          </span>
        </div>

        <div className="space-y-3">
          {profile.goals.map((goal, index) => {
            const isCompleted = index < completedGoals;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 ${
                  isCompleted
                    ? 'bg-slate-800/50 border-green-500'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className={`text-sm ${isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {goal.text}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${isCompleted ? 'text-green-400' : 'text-slate-400'}`}>
                      +{goal.reward}
                    </span>
                  </div>
                </div>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2 text-xs text-green-400 flex items-center gap-1"
                  >
                    <span>✓</span> Completed!
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Custom Nudge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${profile.color} bg-opacity-10 rounded-xl p-4 border border-slate-700`}
      >
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white mb-1">Personalized Nudge</p>
            <p className="text-sm text-slate-200">{randomNudge}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
