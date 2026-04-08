import { motion } from 'motion/react';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: Array<{
    text: string;
    type: 'minimalist' | 'recycler' | 'energySaver';
  }>;
}

interface PersonalityQuizProps {
  onComplete: (personality: string) => void;
}

const questions: Question[] = [
  {
    id: '1',
    question: 'When you finish a drink, you usually...',
    options: [
      { text: 'Bring my own reusable bottle always', type: 'minimalist' },
      { text: 'Make sure it goes in the right bin', type: 'recycler' },
      { text: 'Think about the energy used to make it', type: 'energySaver' },
    ],
  },
  {
    id: '2',
    question: 'Your ideal weekend activity is...',
    options: [
      { text: 'Decluttering and living with less', type: 'minimalist' },
      { text: 'Organizing a campus cleanup', type: 'recycler' },
      { text: 'Finding ways to reduce electricity use', type: 'energySaver' },
    ],
  },
  {
    id: '3',
    question: 'You notice lights on in an empty room. You...',
    options: [
      { text: 'Turn them off and question why so many were needed', type: 'minimalist' },
      { text: 'Turn them off and check the recycling bins while there', type: 'recycler' },
      { text: 'Turn them off and calculate the energy wasted', type: 'energySaver' },
    ],
  },
  {
    id: '4',
    question: 'Your approach to shopping is...',
    options: [
      { text: 'Buy only what I absolutely need', type: 'minimalist' },
      { text: 'Choose products with recyclable packaging', type: 'recycler' },
      { text: 'Pick energy-efficient and durable items', type: 'energySaver' },
    ],
  },
  {
    id: '5',
    question: 'What motivates you most?',
    options: [
      { text: 'Living simply and intentionally', type: 'minimalist' },
      { text: 'Keeping waste out of landfills', type: 'recycler' },
      { text: 'Reducing my carbon footprint', type: 'energySaver' },
    ],
  },
];

export function PersonalityQuiz({ onComplete }: PersonalityQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<'minimalist' | 'recycler' | 'energySaver'>>([]);

  const handleAnswer = (type: 'minimalist' | 'recycler' | 'energySaver') => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate personality
      const counts = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const personality = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      onComplete(personality);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-bold text-white mb-6">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(option.type)}
              className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-left transition-colors border-2 border-transparent hover:border-purple-500 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-purple-500 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-transparent group-hover:text-purple-500" />
                </div>
                <span className="text-white">{option.text}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
