import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface AuraVisualizerProps {
  auraLevel: number; // 0-100
  evolution: 'dormant' | 'active' | 'radiant' | 'legendary';
  isStable: boolean;
}

export function AuraVisualizer({ auraLevel, evolution, isStable }: AuraVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const getAuraColor = () => {
      switch (evolution) {
        case 'dormant':
          return { r: 120, g: 130, b: 160, glow: 0.6 };
        case 'active':
          return { r: 100, g: 255, b: 180, glow: 1.0 };
        case 'radiant':
          return { r: 255, g: 200, b: 60, glow: 1.4 };
        case 'legendary':
          return { r: 220, g: 120, b: 255, glow: 1.8 };
        default:
          return { r: 100, g: 100, b: 120, glow: 0.5 };
      }
    };

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter'; // Makes overlapping colors brighter

      const color = getAuraColor();
      const pulseSpeed = isStable ? 0.03 : 0.08;
      const pulse = Math.sin(time * pulseSpeed) * 0.15 + 0.85;

      // Draw central core
      const coreRadius = Math.max(20, (auraLevel / 100) * 40 * pulse);
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      coreGradient.addColorStop(0, `rgba(255, 255, 255, 0.9)`);
      coreGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`);
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw multiple prominent aura rings
      const rings = evolution === 'legendary' ? 6 : evolution === 'radiant' ? 5 : evolution === 'active' ? 4 : 3;
      
      for (let i = rings; i > 0; i--) {
        const baseRadius = 140; // Increased radius
        const radius = (Math.max(20, auraLevel) / 100) * baseRadius * (i / rings) * pulse;
        const alpha = (0.8 / i) * color.glow;

        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dynamic Particle effects
      if (evolution !== 'dormant') {
        const particleCount = evolution === 'legendary' ? 40 : evolution === 'radiant' ? 25 : 15;
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + time * 0.015 * (i % 2 === 0 ? 1 : -1);
          const distanceOffset = Math.sin(time * 0.05 + i) * 30;
          const distance = 40 + (auraLevel / 100) * 80 + distanceOffset;
          
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          const size = 2 + Math.sin(time * 0.1 + i) * 2;

          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.4 + Math.sin(time*0.1 + i)*0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time++;
      animationFrameId = requestAnimationFrame(render);
    };

    // Set high-res canvas size for sharpness
    canvas.width = 400;
    canvas.height = 400;

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [auraLevel, evolution, isStable]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[300px] max-h-[300px] filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        style={{ imageRendering: 'auto' }}
      />
    </motion.div>
  );
}
