import { useState, useEffect } from 'react';
import { AuraVisualizer } from './components/AuraVisualizer';
import { CampusMap } from './components/CampusMap';
import { MicroEventPopup } from './components/MicroEventPopup';
import { EvolutionDisplay } from './components/EvolutionDisplay';
import { ProximitySystem } from './components/ProximitySystem';
import { EcoDice } from './components/EcoDice';
import { GlobalState } from './components/GlobalState';
import { PersonalityQuiz } from './components/PersonalityQuiz';
import { PersonalityProfile } from './components/PersonalityProfile';
import { RealWorldImpact } from './components/RealWorldImpact';
import { VisualMetaphors } from './components/VisualMetaphors';
import { PersonalForest } from './components/PersonalForest';
import { CampusForest } from './components/CampusForest';
import { Competitions } from './components/Competitions';
import { EcoIdentity } from './components/EcoIdentity';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, Globe, Award, Sparkles } from 'lucide-react';

type Evolution = 'dormant' | 'active' | 'radiant' | 'legendary';
type PersonalityType = 'minimalist' | 'recycler' | 'energySaver';

interface Zone {
  id: string;
  name: string;
  type: 'recycle' | 'energy' | 'movement' | 'water' | 'nature';
  x: number;
  y: number;
  auraBoost: number;
  active: boolean;
}

interface MicroEvent {
  id: string;
  title: string;
  description: string;
  reward: number;
  timeLeft: number;
  type: 'energy' | 'water' | 'recycle' | 'social';
}

interface NearbyPlayer {
  id: string;
  name: string;
  aura: number;
  evolution: Evolution;
  distance: number;
}

export default function App() {
  // Personality & Onboarding
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [personality, setPersonality] = useState<PersonalityType | null>(null);
  const [completedGoals, setCompletedGoals] = useState(1);
  
  // Real-world impact metrics
  const [waterSaved, setWaterSaved] = useState(3.2);
  const [carbonReduced, setCarbonReduced] = useState(1.8);
  const [wasteAvoided, setWasteAvoided] = useState(0.9);
  
  // Visual metaphors progress
  const [waterLevel, setWaterLevel] = useState(45);
  const [treeGrowth, setTreeGrowth] = useState(60);
  const [smogCleared, setSmogCleared] = useState(55);
  
  // Eco-identity
  const [currentTitle, setCurrentTitle] = useState('Water Saver');
  const [campusRank, setCampusRank] = useState(23);
  
  // Competition
  const [userTeam, setUserTeam] = useState("Boy's Block 3");
  
  // View state
  const [activeView, setActiveView] = useState<'game' | 'profile' | 'impact'>('game');
  
  const [auraLevel, setAuraLevel] = useState(45);
  const [evolution, setEvolution] = useState<Evolution>('active');
  const [isStable, setIsStable] = useState(true);
  const [globalAuraLevel, setGlobalAuraLevel] = useState(55);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('up');
  const [activeUsers, setActiveUsers] = useState(127);
  const [currentEvent, setCurrentEvent] = useState<MicroEvent | null>(null);
  const [canRollDice, setCanRollDice] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });

  const [zones] = useState<Zone[]>([
    { id: '1', name: 'Recycling Hub', type: 'recycle', x: 25, y: 30, auraBoost: 15, active: true },
    { id: '2', name: 'Energy Center', type: 'energy', x: 75, y: 25, auraBoost: 20, active: true },
    { id: '3', name: 'Walking Path', type: 'movement', x: 50, y: 70, auraBoost: 10, active: false },
    { id: '4', name: 'Water Station', type: 'water', x: 20, y: 75, auraBoost: 12, active: true },
    { id: '5', name: 'Green Space', type: 'nature', x: 80, y: 65, auraBoost: 18, active: true },
  ]);

  const [nearbyPlayers] = useState<NearbyPlayer[]>([
    { id: '1', name: 'Punya', aura: 68, evolution: 'radiant', distance: 12 },
    { id: '2', name: 'Ayush', aura: 52, evolution: 'active', distance: 8 },
    { id: '3', name: 'Stutie', aura: 43, evolution: 'active', distance: 15 },
    { id: '4', name: 'Shreyash', aura: 85, evolution: 'radiant', distance: 25 },
  ]);

  // Update evolution based on aura level
  useEffect(() => {
    if (auraLevel >= 90) setEvolution('legendary');
    else if (auraLevel >= 60) setEvolution('radiant');
    else if (auraLevel >= 25) setEvolution('active');
    else setEvolution('dormant');
  }, [auraLevel]);

  // Update visual metaphors based on real-world impact
  useEffect(() => {
    setWaterLevel(Math.min(100, (waterSaved / 5) * 100));
    setTreeGrowth(Math.min(100, (carbonReduced / 3) * 100));
    setSmogCleared(Math.min(100, (wasteAvoided / 2) * 100));
  }, [waterSaved, carbonReduced, wasteAvoided]);

  // Simulate random micro-events
  useEffect(() => {
    if (!hasCompletedQuiz) return;
    
    const eventInterval = setInterval(() => {
      if (Math.random() > 0.7 && !currentEvent) {
        const events: MicroEvent[] = [
          {
            id: '1',
            title: '⚡ Energy Save Rush',
            description: 'Turn off unused devices in the next 5 minutes',
            reward: 30,
            timeLeft: 300,
            type: 'energy',
          },
          {
            id: '2',
            title: '💧 Water Hero',
            description: 'Refill stations give 2x Aura for the next 3 minutes',
            reward: 25,
            timeLeft: 180,
            type: 'water',
          },
          {
            id: '3',
            title: '♻️ Recycle Blitz',
            description: 'Recycling Zone bonus active now!',
            reward: 40,
            timeLeft: 240,
            type: 'recycle',
          },
        ];

        setCurrentEvent(events[Math.floor(Math.random() * events.length)]);
      }
    }, 15000);

    return () => clearInterval(eventInterval);
  }, [currentEvent, hasCompletedQuiz]);

  // Count down event timer
  useEffect(() => {
    if (!currentEvent) return;

    const timer = setInterval(() => {
      setCurrentEvent((prev) => {
        if (!prev) return null;
        if (prev.timeLeft <= 1) return null;
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentEvent]);

  // Simulate global aura changes
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalAuraLevel((prev) => {
        const change = Math.random() * 4 - 1.5;
        const newLevel = Math.max(0, Math.min(100, prev + change));
        
        if (newLevel > prev + 1) setTrend('up');
        else if (newLevel < prev - 1) setTrend('down');
        else setTrend('stable');

        return newLevel;
      });

      setActiveUsers((prev) => Math.max(50, Math.min(200, prev + Math.floor(Math.random() * 10 - 4))));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate aura decay/growth
  useEffect(() => {
    if (!hasCompletedQuiz) return;
    
    const interval = setInterval(() => {
      setAuraLevel((prev) => {
        const change = isStable ? 0.1 : -0.3;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isStable, hasCompletedQuiz]);

  const handleQuizComplete = (personalityType: string) => {
    setPersonality(personalityType as PersonalityType);
    setHasCompletedQuiz(true);
  };

  const handleZoneEnter = (zoneId: string) => {
    const zone = zones.find((z) => z.id === zoneId);
    if (zone) {
      const boost = zone.auraBoost;
      setAuraLevel((prev) => Math.min(100, prev + boost));
      setIsStable(true);
      
      // Update real-world impact based on zone type
      if (zone.type === 'water') setWaterSaved(prev => prev + 0.5);
      if (zone.type === 'energy') setCarbonReduced(prev => prev + 0.3);
      if (zone.type === 'recycle') setWasteAvoided(prev => prev + 0.2);
      
      setPlayerPosition({ x: zone.x, y: zone.y });
    }
  };

  const handleEventAccept = () => {
    if (currentEvent) {
      setAuraLevel((prev) => Math.min(100, prev + currentEvent.reward));
      
      // Update metrics based on event type
      if (currentEvent.type === 'water') setWaterSaved(prev => prev + 1);
      if (currentEvent.type === 'energy') setCarbonReduced(prev => prev + 0.8);
      if (currentEvent.type === 'recycle') setWasteAvoided(prev => prev + 0.5);
      
      setCurrentEvent(null);
    }
  };

  const handleEventDismiss = () => {
    setCurrentEvent(null);
  };

  const handleChallengeRoll = (challenge: { reward: number }) => {
    setCanRollDice(false);
    setTimeout(() => {
      setAuraLevel((prev) => Math.min(100, prev + challenge.reward));
      setCanRollDice(true);
    }, 5000);
  };

  // Onboarding/Quiz Modal
  if (!hasCompletedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-slate-900 rounded-2xl p-8 border-2 border-slate-700 shadow-2xl"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-16 h-16 text-purple-400" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome to EcoSync
            </h1>
            <p className="text-slate-400">
              Discover your eco-personality and start building a better campus
            </p>
          </div>

          <PersonalityQuiz onComplete={handleQuizComplete} />
        </motion.div>

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                EcoSync
              </h1>
              <p className="text-xs text-slate-400">Ambient Campus Game</p>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden lg:flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-slate-400">Your Aura</p>
                <p className="text-2xl font-bold">{Math.round(auraLevel)}</p>
              </div>
              <div className="w-px h-10 bg-slate-700" />
              <div className="text-right">
                <p className="text-sm text-slate-400">Rank</p>
                <p className="text-sm font-semibold text-purple-400">#{campusRank}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveView('game')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeView === 'game'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Game</span>
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeView === 'profile'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Profile</span>
            </button>
            <button
              onClick={() => setActiveView('impact')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeView === 'impact'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Impact</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-32 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 p-4 lg:hidden"
        >
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-xs text-slate-400">Your Aura</p>
              <p className="text-xl font-bold">{Math.round(auraLevel)}</p>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <p className="text-xs text-slate-400">Rank</p>
              <p className="text-lg font-semibold text-purple-400">#{campusRank}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="pt-36 pb-8 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Game View */}
          {activeView === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <h2 className="text-lg font-bold mb-4">Your Aura</h2>
                  <div className="w-full aspect-square flex items-center justify-center">
                    <AuraVisualizer auraLevel={auraLevel} evolution={evolution} isStable={isStable} />
                  </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <h2 className="text-lg font-bold mb-4">Evolution</h2>
                  <EvolutionDisplay currentEvolution={evolution} auraLevel={auraLevel} />
                </div>
              </div>

              {/* Center Column */}
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <h2 className="text-lg font-bold mb-4">Campus Zones</h2>
                  <div className="w-full aspect-square">
                    <CampusMap
                      zones={zones}
                      playerPosition={playerPosition}
                      onZoneEnter={handleZoneEnter}
                      globalAuraLevel={globalAuraLevel}
                    />
                  </div>
                  <p className="text-xs text-slate-400 text-center mt-4">
                    Click zones to boost your aura and contribute to campus health!
                  </p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <EcoDice onChallengeRoll={handleChallengeRoll} canRoll={canRollDice} />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <h2 className="text-lg font-bold mb-4">Campus State</h2>
                  <GlobalState
                    globalAuraLevel={globalAuraLevel}
                    trend={trend}
                    activeUsers={activeUsers}
                  />
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <h2 className="text-lg font-bold mb-4">Proximity</h2>
                  <ProximitySystem nearbyPlayers={nearbyPlayers} yourAura={auraLevel} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Profile View */}
          {activeView === 'profile' && personality && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <h2 className="text-lg font-bold mb-4">Your Personality</h2>
                  <PersonalityProfile
                    personality={personality}
                    completedGoals={completedGoals}
                    totalGoals={3}
                  />
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <h2 className="text-lg font-bold mb-4">Competitions</h2>
                  <Competitions userTeam={userTeam} timeRemaining="2d 14h" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <h2 className="text-lg font-bold mb-4">Eco-Identity</h2>
                  <EcoIdentity currentTitle={currentTitle} campusRank={campusRank} totalUsers={activeUsers} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Impact View */}
          {activeView === 'impact' && (
            <motion.div
              key="impact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <PersonalForest
                    totalMinutes={Math.round((waterSaved + carbonReduced + wasteAvoided) * 10)}
                    todayMinutes={Math.round((waterSaved + carbonReduced) * 2)}
                    onPlantNew={() => {
                      // Simulate planting action
                      setWaterSaved(prev => prev + 0.5);
                      setCarbonReduced(prev => prev + 0.3);
                    }}
                  />
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <RealWorldImpact
                    waterSaved={waterSaved}
                    carbonReduced={carbonReduced}
                    wasteAvoided={wasteAvoided}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
                  <CampusForest
                    totalTrees={Math.round(activeUsers * 0.8 + auraLevel / 2)}
                    todayGrowth={Math.round(activeUsers * 0.15)}
                    activeContributors={activeUsers}
                    forestHealth={Math.round(globalAuraLevel)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Micro Event Popup */}
      <MicroEventPopup
        event={currentEvent}
        onAccept={handleEventAccept}
        onDismiss={handleEventDismiss}
      />

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}