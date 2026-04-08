import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Globe, TrendingUp, Users, TreePine } from 'lucide-react';

interface CampusForestProps {
  totalTrees: number;
  todayGrowth: number;
  activeContributors: number;
  forestHealth: number; // 0-100
}

export function CampusForest({ totalTrees, todayGrowth, activeContributors, forestHealth }: CampusForestProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationTime, setAnimationTime] = useState(0);
  const [viewMode, setViewMode] = useState<'forest' | 'stats'>('forest');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime(prev => prev + 0.03);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawCampusForest = () => {
      canvas.width = 500;
      canvas.height = 350;

      // Sky with health-based color
      const skyColor = forestHealth > 70 
        ? { r: 160, g: 232, b: 213 }  // Healthy sky (Forest app vibe)
        : forestHealth > 40
        ? { r: 170, g: 200, b: 210 }  // OK sky
        : { r: 160, g: 160, b: 170 }; // Poor sky

      const skyGradient = ctx.createLinearGradient(0, 0, 0, 350);
      skyGradient.addColorStop(0, `rgb(${skyColor.r}, ${skyColor.g}, ${skyColor.b})`);
      skyGradient.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, 500, 350);

      // Cute round Hills in background
      ctx.fillStyle = '#8FE0C3';
      ctx.beginPath();
      ctx.ellipse(100, 250, 150, 80, 0, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = '#78D6B5';
      ctx.beginPath();
      ctx.ellipse(350, 250, 200, 100, 0, Math.PI, 0);
      ctx.fill();

      // Ground
      ctx.fillStyle = '#5EB287';
      ctx.fillRect(0, 240, 500, 110);
      ctx.fillStyle = '#4CA175';
      ctx.fillRect(0, 300, 500, 50);

      // Draw forest based on totalTrees (max 50 trees for visual clarity)
      const displayTrees = Math.min(50, totalTrees);
      const treeDensity = displayTrees / 50;

      // Background trees (distant)
      for (let i = 0; i < displayTrees * 0.3; i++) {
        const x = (i * 50 + animationTime * 10) % 500;
        const y = 200 + (Math.sin(i) * 20);
        drawDistantTree(ctx, x, y, 0.5, animationTime + i);
      }

      // Midground trees
      for (let i = 0; i < displayTrees * 0.5; i++) {
        const x = (i * 30 + animationTime * 5) % 500;
        const y = 230 + (Math.sin(i * 0.5) * 15);
        drawMidTree(ctx, x, y, 0.8, animationTime + i, forestHealth);
      }

      // Foreground trees
      for (let i = 0; i < displayTrees * 0.2; i++) {
        const x = (i * 60 + animationTime * 2) % 500;
        const y = 260;
        drawForegroundTree(ctx, x, y, 1, animationTime + i, forestHealth);
      }

      // Wildlife (birds) if forest health is good
      if (forestHealth > 60) {
        for (let i = 0; i < 3; i++) {
          const x = (i * 150 + animationTime * 20) % 550 - 50;
          const y = 80 + Math.sin(animationTime + i) * 30;
          drawBird(ctx, x, y, animationTime);
        }
      }

      // Health indicator overlay
      if (forestHealth < 50) {
        ctx.fillStyle = `rgba(100, 100, 100, ${(50 - forestHealth) / 100})`;
        ctx.fillRect(0, 0, 500, 350);
      }

      // Sparkles for milestone achievements
      if (totalTrees % 10 === 0 && totalTrees > 0) {
        for (let i = 0; i < 5; i++) {
          const sparkleX = 250 + Math.cos(animationTime * 2 + i) * 100;
          const sparkleY = 150 + Math.sin(animationTime * 2 + i) * 50;
          ctx.fillStyle = 'rgba(255, 255, 200, 0.8)';
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawDistantTree = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, offset: number) => {
      const sway = Math.sin(offset) * 1;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(sway * 0.01);
      
      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 6 * scale, 2 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(80, 100, 70, 0.4)';
      ctx.fillRect(-2 * scale, -10 * scale, 4 * scale, 10 * scale);
      
      ctx.fillStyle = 'rgba(60, 120, 80, 0.4)';
      ctx.beginPath();
      ctx.arc(0, -15 * scale, 8 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawMidTree = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, offset: number, health: number) => {
      const sway = Math.sin(offset) * 2;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(sway * 0.01);
      
      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 10 * scale, 3 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Trunk
      ctx.fillStyle = '#654321';
      ctx.fillRect(-4 * scale, -20 * scale, 8 * scale, 20 * scale);
      
      // Leaves - color based on health
      const leafHealth = health / 100;
      const leafColor = `rgb(${100 - leafHealth * 50}, ${150 + leafHealth * 50}, ${80})`;
      ctx.fillStyle = leafColor;
      
      ctx.beginPath();
      ctx.arc(-8 * scale, -25 * scale, 12 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(8 * scale, -25 * scale, 12 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(0, -30 * scale, 15 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawForegroundTree = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, offset: number, health: number) => {
      const sway = Math.sin(offset) * 3;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(sway * 0.01);
      
      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 20 * scale, 5 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Trunk with texture
      const trunkGradient = ctx.createLinearGradient(-5 * scale, 0, 5 * scale, 0);
      trunkGradient.addColorStop(0, '#4A3728');
      trunkGradient.addColorStop(0.5, '#654321');
      trunkGradient.addColorStop(1, '#4A3728');
      ctx.fillStyle = trunkGradient;
      ctx.fillRect(-5 * scale, -35 * scale, 10 * scale, 35 * scale);
      
      // Bark texture
      ctx.strokeStyle = '#3A2718';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(-5 * scale, -30 * scale + i * 7 * scale);
        ctx.lineTo(5 * scale, -28 * scale + i * 7 * scale);
        ctx.stroke();
      }
      
      // Leaves with health-based vibrancy
      const leafHealth = health / 100;
      
      // Multiple leaf layers
      for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * 10 * scale;
        const leafSize = (20 - layer * 3) * scale;
        
        const r = Math.floor(34 + leafHealth * 30);
        const g = Math.floor(139 + leafHealth * 60);
        const b = Math.floor(34 + leafHealth * 20);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.8 - layer * 0.1})`;
        
        ctx.beginPath();
        ctx.arc(-leafSize * 0.6, -35 * scale - layerOffset, leafSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(leafSize * 0.6, -35 * scale - layerOffset, leafSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, -40 * scale - layerOffset, leafSize * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Light spots on healthy trees
      if (health > 70) {
        ctx.fillStyle = 'rgba(144, 238, 144, 0.4)';
        for (let i = 0; i < 4; i++) {
          const spotAngle = (i / 4) * Math.PI * 2 + offset;
          const spotX = Math.cos(spotAngle) * 12 * scale;
          const spotY = -40 * scale + Math.sin(spotAngle) * 12 * scale;
          ctx.beginPath();
          ctx.arc(spotX, spotY, 5 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      ctx.restore();
    };

    const drawBird = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
      ctx.save();
      ctx.translate(x, y);
      
      const wingFlap = Math.sin(time * 10) * 10;
      
      ctx.strokeStyle = '#2F4F4F';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      // Left wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-8, wingFlap, -15, wingFlap - 5);
      ctx.stroke();
      
      // Right wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(8, wingFlap, 15, wingFlap - 5);
      ctx.stroke();
      
      // Body
      ctx.fillStyle = '#2F4F4F';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    drawCampusForest();
  }, [totalTrees, forestHealth, animationTime]);

  const getHealthStatus = () => {
    if (forestHealth >= 80) return { label: 'Thriving', color: 'text-green-400', icon: '🌟' };
    if (forestHealth >= 60) return { label: 'Healthy', color: 'text-lime-400', icon: '🌱' };
    if (forestHealth >= 40) return { label: 'Growing', color: 'text-yellow-400', icon: '🌿' };
    return { label: 'Needs Care', color: 'text-orange-400', icon: '🍂' };
  };

  const status = getHealthStatus();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            Campus-Wide Forest
          </h3>
          <p className="text-sm text-slate-400">Everyone's contribution in one place</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('forest')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'forest' 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Forest
          </button>
          <button
            onClick={() => setViewMode('stats')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'stats' 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Stats
          </button>
        </div>
      </div>

      {viewMode === 'forest' ? (
        <>
          {/* Forest Canvas */}
          <div className="relative bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ imageRendering: 'auto' }}
            />

            {/* Health overlay */}
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-xl">{status.icon}</span>
                <div>
                  <p className="text-xs text-slate-300">Forest Health</p>
                  <p className={`text-sm font-bold ${status.color}`}>{status.label}</p>
                </div>
              </div>
            </div>

            {/* Live counter */}
            <motion.div
              key={totalTrees}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{totalTrees}</p>
                <p className="text-xs text-white opacity-90">Total Trees</p>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <p className="text-xs text-slate-400">Today</p>
              </div>
              <p className="text-xl font-bold text-white">+{todayGrowth}</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-400" />
                <p className="text-xs text-slate-400">Active</p>
              </div>
              <p className="text-xl font-bold text-white">{activeContributors}</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TreePine className="w-4 h-4 text-purple-400" />
                <p className="text-xs text-slate-400">Health</p>
              </div>
              <p className="text-xl font-bold text-white">{forestHealth}%</p>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {/* Detailed Stats View */}
          <div className="bg-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-white mb-3">This Week's Growth</h4>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const growth = Math.floor(Math.random() * 50) + 20;
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-8">{day}</span>
                    <div className="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(growth / 70) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      />
                    </div>
                    <span className="text-xs text-white font-bold w-8">+{growth}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <h4 className="font-bold text-white mb-3">Top Contributors Today</h4>
            <div className="space-y-2">
              {['Punya', 'Ayush', 'Stutie'].map((name, i) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                    <span className="text-sm text-white">{name}</span>
                  </div>
                  <span className="text-sm text-green-400 font-bold">+{12 - i * 3} trees</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg p-3 border border-blue-600/30">
        <p className="text-xs text-slate-300">
          🌍 <span className="font-semibold">Collective Impact:</span> This forest represents every eco-action taken on campus. Keep the forest healthy by staying active!
        </p>
      </div>
    </div>
  );
}
