import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface VisualMetaphorsProps {
  waterLevel: number; // 0-100
  treeGrowth: number; // 0-100
  smogCleared: number; // 0-100
}

export function VisualMetaphors({ waterLevel, treeGrowth, smogCleared }: VisualMetaphorsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawScene = () => {
      canvas.width = 400;
      canvas.height = 300;

      // Background gradient (sky)
      const skyGradient = ctx.createLinearGradient(0, 0, 0, 300);
      const skyOpacity = smogCleared / 100;
      skyGradient.addColorStop(0, `rgba(135, 206, 235, ${skyOpacity})`);
      skyGradient.addColorStop(1, `rgba(255, 255, 255, ${skyOpacity})`);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, 400, 300);

      // Smog overlay (decreases as smogCleared increases)
      const smogOpacity = (100 - smogCleared) / 150;
      ctx.fillStyle = `rgba(120, 120, 120, ${smogOpacity})`;
      ctx.fillRect(0, 0, 400, 300);

      // Ground
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(0, 250, 400, 50);

      // Lake (fills up based on waterLevel)
      const lakeHeight = (waterLevel / 100) * 80;
      const lakeY = 250 - lakeHeight;
      const waterGradient = ctx.createLinearGradient(0, lakeY, 0, 250);
      waterGradient.addColorStop(0, 'rgba(100, 180, 255, 0.7)');
      waterGradient.addColorStop(1, 'rgba(50, 120, 200, 0.9)');
      ctx.fillStyle = waterGradient;
      ctx.fillRect(50, lakeY, 150, lakeHeight);

      // Water ripples
      if (waterLevel > 0) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(125, lakeY + 10 + i * 10, 20 + i * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Tree (grows based on treeGrowth)
      const treeX = 300;
      const treeBaseY = 250;
      const treeHeight = (treeGrowth / 100) * 100;

      if (treeGrowth > 0) {
        // Trunk
        const trunkHeight = treeHeight * 0.6;
        ctx.fillStyle = '#654321';
        ctx.fillRect(treeX - 5, treeBaseY - trunkHeight, 10, trunkHeight);

        // Leaves (appear as tree grows)
        if (treeGrowth > 20) {
          const leafSize = ((treeGrowth - 20) / 80) * 50;
          ctx.fillStyle = '#228B22';

          // Multiple leaf clusters
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(
              treeX + (i - 1) * (leafSize * 0.3),
              treeBaseY - trunkHeight - (i * leafSize * 0.2),
              leafSize * (0.8 + i * 0.1),
              0,
              Math.PI * 2
            );
            ctx.fill();
          }

          // Top cluster
          ctx.beginPath();
          ctx.arc(treeX, treeBaseY - trunkHeight - leafSize * 0.5, leafSize * 0.7, 0, Math.PI * 2);
          ctx.fill();

          // Add some highlight leaves
          ctx.fillStyle = '#32CD32';
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            const angle = (i / 5) * Math.PI * 2;
            const x = treeX + Math.cos(angle) * (leafSize * 0.6);
            const y = treeBaseY - trunkHeight - leafSize * 0.5 + Math.sin(angle) * (leafSize * 0.6);
            ctx.arc(x, y, leafSize * 0.15, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Sun (more visible as smog clears)
      const sunOpacity = smogCleared / 100;
      const sunGradient = ctx.createRadialGradient(350, 50, 0, 350, 50, 30);
      sunGradient.addColorStop(0, `rgba(255, 255, 100, ${sunOpacity})`);
      sunGradient.addColorStop(0.5, `rgba(255, 220, 0, ${sunOpacity * 0.8})`);
      sunGradient.addColorStop(1, `rgba(255, 180, 0, 0)`);
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(350, 50, 30, 0, Math.PI * 2);
      ctx.fill();
    };

    drawScene();
  }, [waterLevel, treeGrowth, smogCleared]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Your Digital World</h3>
        <p className="text-sm text-slate-400">Collective actions building something beautiful</p>
      </div>

      {/* Canvas */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg"
          style={{ imageRendering: 'auto' }}
        />
      </div>

      {/* Metaphor Explanations */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">💧</span>
            <span className="text-xs font-bold text-white">{waterLevel}%</span>
          </div>
          <p className="text-xs text-slate-400">Lake Filled</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🌱</span>
            <span className="text-xs font-bold text-white">{treeGrowth}%</span>
          </div>
          <p className="text-xs text-slate-400">Tree Grown</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">☀️</span>
            <span className="text-xs font-bold text-white">{smogCleared}%</span>
          </div>
          <p className="text-xs text-slate-400">Smog Cleared</p>
        </div>
      </div>

      {/* Progress message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-xs text-slate-500">
          {waterLevel < 30 && 'The lake is low. Save water to fill it up! 💧'}
          {waterLevel >= 30 && waterLevel < 70 && 'The lake is growing. Keep going! 🌊'}
          {waterLevel >= 70 && 'The lake is thriving! Amazing work! 💙'}
        </p>
      </motion.div>
    </div>
  );
}
