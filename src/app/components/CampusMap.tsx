import { Recycle, Zap, Footprints, Droplet, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import mapImage from 'figma:asset/a05fb41e745685c1d369be4fd694223b329ab297.png';

interface Zone {
  id: string;
  name: string;
  type: 'recycle' | 'energy' | 'movement' | 'water' | 'nature';
  x: number;
  y: number;
  auraBoost: number;
  active: boolean;
}

interface CampusMapProps {
  zones: Zone[];
  playerPosition: { x: number; y: number };
  onZoneEnter: (zoneId: string) => void;
  globalAuraLevel: number;
}

export function CampusMap({ zones, playerPosition, onZoneEnter, globalAuraLevel }: CampusMapProps) {
  const getZoneIcon = (type: Zone['type']) => {
    switch (type) {
      case 'recycle':
        return Recycle;
      case 'energy':
        return Zap;
      case 'movement':
        return Footprints;
      case 'water':
        return Droplet;
      case 'nature':
        return Leaf;
    }
  };

  const getZoneColor = (type: Zone['type']) => {
    switch (type) {
      case 'recycle':
        return 'from-green-500 to-emerald-600';
      case 'energy':
        return 'from-yellow-500 to-amber-600';
      case 'movement':
        return 'from-blue-500 to-cyan-600';
      case 'water':
        return 'from-sky-500 to-blue-600';
      case 'nature':
        return 'from-lime-500 to-green-600';
    }
  };

  const mapOpacity = globalAuraLevel > 60 ? 1 : globalAuraLevel > 30 ? 0.8 : 0.6;
  const mapFilter = globalAuraLevel > 60 ? 'brightness(1.2)' : globalAuraLevel > 30 ? 'brightness(1)' : 'brightness(0.7) saturate(0.7)';

  return (
    <div 
      className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700 shadow-xl"
      style={{ 
        opacity: mapOpacity,
        filter: mapFilter,
        transition: 'opacity 2s, filter 2s'
      }}
    >
      {/* Campus Background Image */}
      <div className="absolute inset-0 bg-slate-800">
        <img 
          src={mapImage} 
          alt="Campus Map" 
          className="w-full h-full object-cover"
        />
        {/* Subtle dark overlay for better contrast of markers */}
        <div className="absolute inset-0 bg-slate-900/30 mix-blend-multiply" />
      </div>

      {/* Zones */}
      {zones.map((zone) => {
        const Icon = getZoneIcon(zone.type);
        const distance = Math.sqrt(
          Math.pow(zone.x - playerPosition.x, 2) + Math.pow(zone.y - playerPosition.y, 2)
        );
        const isNearby = distance < 50;

        return (
          <motion.div
            key={zone.id}
            className="absolute cursor-pointer"
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onZoneEnter(zone.id)}
          >
            {/* Zone glow effect */}
            {zone.active && (
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${getZoneColor(zone.type)} blur-xl`}
                style={{ width: '60px', height: '60px', transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Zone icon */}
            <div
              className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${getZoneColor(zone.type)} flex items-center justify-center shadow-lg border-2 border-white/20 backdrop-blur-sm ${
                isNearby ? 'ring-4 ring-white/60' : ''
              }`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Zone label */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 shadow-lg">
              {zone.name}
              {isNearby && (
                <span className="ml-1 text-green-400">+{zone.auraBoost}</span>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Player position */}
      <motion.div
        className="absolute w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)] ring-4 ring-purple-400/50 z-10"
        style={{
          left: `${playerPosition.x}%`,
          top: `${playerPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
