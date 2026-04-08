import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { TreePine, Droplet, Wind, Sprout, Award } from 'lucide-react';

interface Plant {
  id: string;
  type: 'tree' | 'bush' | 'flower' | 'grass';
  species: string;
  x: number;
  y: number;
  age: number; // minutes of contribution
  maxAge: number;
  action: 'water' | 'energy' | 'recycle' | 'general';
  isGrowing: boolean;
  fullyGrown: boolean;
}

interface PersonalForestProps {
  totalMinutes: number;
  todayMinutes: number;
  onPlantNew: () => void;
}

export function PersonalForest({ totalMinutes, todayMinutes, onPlantNew }: PersonalForestProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plants, setPlants] = useState<Plant[]>([
    { id: '1', type: 'tree', species: 'Oak', x: 100, y: 180, age: 30, maxAge: 30, action: 'energy', isGrowing: false, fullyGrown: true },
    { id: '2', type: 'bush', species: 'Berry Bush', x: 200, y: 200, age: 15, maxAge: 15, action: 'water', isGrowing: false, fullyGrown: true },
    { id: '3', type: 'flower', species: 'Sunflower', x: 300, y: 210, age: 5, maxAge: 5, action: 'recycle', isGrowing: false, fullyGrown: true },
    { id: '4', type: 'tree', species: 'Pine', x: 150, y: 170, age: 12, maxAge: 30, action: 'energy', isGrowing: true, fullyGrown: false },
  ]);

  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      setAnimationTime(prev => prev + 0.05);
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawScene = () => {
      canvas.width = 400;
      canvas.height = 300;

      // Sky gradient (day time)
      const skyGradient = ctx.createLinearGradient(0, 0, 0, 300);
      skyGradient.addColorStop(0, '#A0E8D5');
      skyGradient.addColorStop(1, '#E6FAF5');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, 400, 300);

      // Clouds
      drawCloud(ctx, 80, 40, animationTime * 0.5);
      drawCloud(ctx, 250, 60, animationTime * 0.3);

      // Isometric Ground base
      ctx.fillStyle = '#5EB287';
      ctx.fillRect(0, 220, 400, 80);
      ctx.fillStyle = '#4CA175';
      ctx.fillRect(0, 260, 400, 40);

      // Draw plants from back to front (by y position)
      const sortedPlants = [...plants].sort((a, b) => a.y - b.y);
      sortedPlants.forEach(plant => {
        drawPlant(ctx, plant);
      });

      // Sun
      const sunGradient = ctx.createRadialGradient(350, 50, 0, 350, 50, 30);
      sunGradient.addColorStop(0, 'rgba(255, 255, 150, 1)');
      sunGradient.addColorStop(0.5, 'rgba(255, 220, 0, 0.8)');
      sunGradient.addColorStop(1, 'rgba(255, 180, 0, 0)');
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(350, 50, 30, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, offset: number) => {
      const cloudX = (x + offset) % 450 - 50;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(cloudX, y, 15, 0, Math.PI * 2);
      ctx.arc(cloudX + 20, y, 20, 0, Math.PI * 2);
      ctx.arc(cloudX + 40, y, 15, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPlant = (ctx: CanvasRenderingContext2D, plant: Plant) => {
      const growthPercent = Math.min(100, (plant.age / plant.maxAge) * 100);
      const baseScale = growthPercent / 100;
      
      // Add gentle sway animation
      const sway = Math.sin(animationTime + plant.x * 0.1) * 2;

      ctx.save();
      ctx.translate(plant.x, plant.y);

      // Draw isometric shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 15 * baseScale, 5 * baseScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing glow for growing plants
      if (plant.isGrowing) {
        const glowRadius = 20 + Math.sin(animationTime * 2) * 5;
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
        glowGradient.addColorStop(0, 'rgba(100, 255, 100, 0.3)');
        glowGradient.addColorStop(1, 'rgba(100, 255, 100, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.rotate(sway * 0.01);

      if (plant.type === 'tree') {
        // Tree trunk
        const trunkHeight = 40 * baseScale;
        const trunkWidth = 8 * baseScale;
        ctx.fillStyle = '#654321';
        ctx.fillRect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight);

        // Tree leaves (multiple layers)
        if (growthPercent > 30) {
          const leafScale = ((growthPercent - 30) / 70) * baseScale;
          
          // Species-specific leaf style
          if (plant.species === 'Oak') {
            // Oak - round canopy
            ctx.fillStyle = '#228B22';
            for (let i = 0; i < 3; i++) {
              ctx.beginPath();
              ctx.arc(0, -trunkHeight - i * 10 * leafScale, 25 * leafScale, 0, Math.PI * 2);
              ctx.fill();
            }
            // Highlights
            ctx.fillStyle = '#32CD32';
            ctx.beginPath();
            ctx.arc(-8 * leafScale, -trunkHeight - 15 * leafScale, 10 * leafScale, 0, Math.PI * 2);
            ctx.fill();
          } else if (plant.species === 'Pine') {
            // Pine - triangular
            ctx.fillStyle = '#2F4F2F';
            for (let i = 0; i < 3; i++) {
              ctx.beginPath();
              ctx.moveTo(0, -trunkHeight - 40 * leafScale + i * 12 * leafScale);
              ctx.lineTo(-15 * leafScale + i * 5 * leafScale, -trunkHeight - 20 * leafScale + i * 12 * leafScale);
              ctx.lineTo(15 * leafScale - i * 5 * leafScale, -trunkHeight - 20 * leafScale + i * 12 * leafScale);
              ctx.closePath();
              ctx.fill();
            }
          }

          // Sparkles for fully grown trees
          if (plant.fullyGrown) {
            ctx.fillStyle = 'rgba(255, 255, 200, 0.8)';
            for (let i = 0; i < 3; i++) {
              const sparkleAngle = animationTime + i * 2;
              const sparkleX = Math.cos(sparkleAngle) * 20 * leafScale;
              const sparkleY = -trunkHeight - 25 * leafScale + Math.sin(sparkleAngle) * 15 * leafScale;
              ctx.beginPath();
              ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      } else if (plant.type === 'bush') {
        // Bush - cluster of circles
        const bushSize = 20 * baseScale;
        ctx.fillStyle = '#2E8B57';
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          const x = Math.cos(angle) * (bushSize * 0.5);
          const y = -10 * baseScale + Math.sin(angle) * (bushSize * 0.5);
          ctx.beginPath();
          ctx.arc(x, y, bushSize * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
        // Berries if fully grown
        if (plant.fullyGrown) {
          ctx.fillStyle = '#DC143C';
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + animationTime * 0.5;
            const x = Math.cos(angle) * (bushSize * 0.4);
            const y = -10 * baseScale + Math.sin(angle) * (bushSize * 0.4);
            ctx.beginPath();
            ctx.arc(x, y, 3 * baseScale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (plant.type === 'flower') {
        // Flower stem
        const stemHeight = 25 * baseScale;
        ctx.strokeStyle = '#228B22';
        ctx.lineWidth = 2 * baseScale;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -stemHeight);
        ctx.stroke();

        // Flower petals
        if (growthPercent > 50) {
          const petalScale = ((growthPercent - 50) / 50) * baseScale;
          const petalColors = ['#FF69B4', '#FFB6C1', '#FF1493'];
          const colorIndex = Math.floor(animationTime) % petalColors.length;
          
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + animationTime * 0.2;
            const petalX = Math.cos(angle) * 8 * petalScale;
            const petalY = -stemHeight + Math.sin(angle) * 8 * petalScale;
            
            ctx.fillStyle = petalColors[i % petalColors.length];
            ctx.beginPath();
            ctx.arc(petalX, petalY, 6 * petalScale, 0, Math.PI * 2);
            ctx.fill();
          }

          // Flower center
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(0, -stemHeight, 5 * petalScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    drawScene();
  }, [plants, animationTime]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if clicked on a plant
    const clickedPlant = plants.find(plant => {
      const dx = x - plant.x;
      const dy = y - plant.y;
      return Math.sqrt(dx * dx + dy * dy) < 30;
    });

    setSelectedPlant(clickedPlant || null);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'water': return 'text-blue-400';
      case 'energy': return 'text-yellow-400';
      case 'recycle': return 'text-green-400';
      default: return 'text-purple-400';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'water': return Droplet;
      case 'energy': return Wind;
      case 'recycle': return TreePine;
      default: return Sprout;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TreePine className="w-5 h-5 text-green-400" />
            Your Personal Forest
          </h3>
          <p className="text-sm text-slate-400">Every eco-action grows something beautiful</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Total Plants</p>
          <p className="text-2xl font-bold text-white">{plants.length}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Today</p>
          <p className="text-2xl font-bold text-green-400">{todayMinutes}m</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">All Time</p>
          <p className="text-2xl font-bold text-purple-400">{totalMinutes}m</p>
        </div>
      </div>

      {/* Forest Canvas */}
      <div className="relative bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full cursor-pointer"
          style={{ imageRendering: 'auto' }}
        />

        {/* Growing indicator */}
        <AnimatePresence>
          {plants.some(p => p.isGrowing) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sprout className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-xs font-semibold text-white">Growing...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Plant Details */}
      <AnimatePresence>
        {selectedPlant && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-white">{selectedPlant.species}</h4>
                <p className="text-xs text-slate-400 capitalize">{selectedPlant.type}</p>
              </div>
              <motion.div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                  selectedPlant.fullyGrown ? 'from-green-400 to-emerald-500' : 'from-slate-600 to-slate-700'
                } flex items-center justify-center`}
                animate={selectedPlant.fullyGrown ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {selectedPlant.fullyGrown ? (
                  <Award className="w-5 h-5 text-white" />
                ) : (
                  <Sprout className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Growth</span>
                  <span className="text-white font-bold">
                    {Math.min(100, Math.round((selectedPlant.age / selectedPlant.maxAge) * 100))}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: `${Math.min(100, (selectedPlant.age / selectedPlant.maxAge) * 100)}%` 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Grown from</span>
                <span className={`font-semibold ${getActionColor(selectedPlant.action)} flex items-center gap-1`}>
                  {(() => {
                    const Icon = getActionIcon(selectedPlant.action);
                    return <Icon className="w-3 h-3" />;
                  })()}
                  {selectedPlant.action} actions
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Time invested</span>
                <span className="text-white font-semibold">{selectedPlant.age} minutes</span>
              </div>

              {selectedPlant.fullyGrown && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span>✓</span> Fully grown! This plant is now part of your permanent forest.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plant New Button */}
      <motion.button
        onClick={onPlantNew}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Sprout className="w-5 h-5" />
        Plant New (Do an Eco-Action)
      </motion.button>

      {/* Info */}
      <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg p-3 border border-green-600/30">
        <p className="text-xs text-slate-300">
          💡 <span className="font-semibold">How it works:</span> Complete eco-actions to plant new trees and flowers. Each action type grows a different species. Keep contributing to watch your forest flourish!
        </p>
      </div>
    </div>
  );
}
