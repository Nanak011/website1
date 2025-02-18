import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Atom, ArrowRight, ArrowDown, RotateCcw, Play, Ruler, Clock, Calculator } from 'lucide-react';

interface ProjectileData {
  time: number;
  maxHeight: number;
  range: number;
  currentHeight: number;
  currentDistance: number;
}

const PhysicsLab = () => {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(10);
  const [isSimulating, setIsSimulating] = useState(false);
  const [projectileData, setProjectileData] = useState<ProjectileData | null>(null);
  const projectileControls = useAnimation();

  const calculateTrajectory = () => {
    const g = 9.81; // gravity in m/s²
    const angleRad = (angle * Math.PI) / 180;
    const time = (2 * velocity * Math.sin(angleRad)) / g;
    const maxHeight = (velocity * Math.sin(angleRad)) ** 2 / (2 * g);
    const range = velocity * Math.cos(angleRad) * time;

    return { time, maxHeight, range };
  };

  const updateProjectileData = (t: number, fullData: ProjectileData) => {
    const angleRad = (angle * Math.PI) / 180;
    const g = 9.81;
    
    const currentDistance = velocity * Math.cos(angleRad) * t;
    const currentHeight = (velocity * Math.sin(angleRad) * t) - (0.5 * g * t * t);

    setProjectileData({
      ...fullData,
      currentHeight: Math.max(0, currentHeight),
      currentDistance: currentDistance
    });
  };

  const startSimulation = async () => {
    if (isSimulating) return;

    setIsSimulating(true);
    const { time, maxHeight, range } = calculateTrajectory();
    
    const initialData: ProjectileData = {
      time,
      maxHeight,
      range,
      currentHeight: 0,
      currentDistance: 0
    };
    setProjectileData(initialData);

    // Scale factors for visualization
    const scaleX = 400 / range;
    const scaleY = 300 / maxHeight;

    // Animation duration in seconds (scaled for better visualization)
    const duration = time * 0.5;
    
    // Number of steps for smooth data updates
    const steps = 50;
    const stepDuration = duration / steps;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * time;
      updateProjectileData(t, initialData);
      await new Promise(resolve => setTimeout(resolve, stepDuration * 1000));
    }

    await projectileControls.start({
      x: range * scaleX,
      y: -maxHeight * scaleY,
      transition: {
        duration: duration,
        type: "tween",
        ease: "linear"
      }
    });

    await projectileControls.start({
      x: range * scaleX,
      y: 0,
      transition: {
        duration: duration,
        type: "tween",
        ease: "linear"
      }
    });

    setIsSimulating(false);
  };

  const resetSimulation = () => {
    projectileControls.set({ x: 0, y: 0 });
    setIsSimulating(false);
    setProjectileData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Physics Lab</h1>
          <p className="text-purple-200 text-lg">Explore projectile motion and other physics phenomena</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Controls</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">
                  Launch Angle (degrees)
                </label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white mt-1 block">{angle}°</span>
              </div>

              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">
                  Initial Velocity (m/s)
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={velocity}
                  onChange={(e) => setVelocity(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white mt-1 block">{velocity} m/s</span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
                
                <button
                  onClick={resetSimulation}
                  disabled={isSimulating}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Real-time Data Display */}
              {projectileData && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Trajectory Data</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Flight Time:</span>
                      </div>
                      <p className="text-white">{projectileData.time.toFixed(2)} s</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <ArrowDown className="w-4 h-4" />
                        <span className="text-sm">Max Height:</span>
                      </div>
                      <p className="text-white">{projectileData.maxHeight.toFixed(2)} m</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-sm">Range:</span>
                      </div>
                      <p className="text-white">{projectileData.range.toFixed(2)} m</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <Calculator className="w-4 h-4" />
                        <span className="text-sm">Current:</span>
                      </div>
                      <p className="text-white text-sm">
                        H: {projectileData.currentHeight.toFixed(1)} m
                        <br />
                        D: {projectileData.currentDistance.toFixed(1)} m
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Simulation Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 h-[500px] relative">
              <h2 className="text-xl font-semibold text-white mb-4">Projectile Motion</h2>
              
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30" />
              
              {/* Angle Indicator */}
              <div
                className="absolute bottom-0 left-0 w-20 h-20"
                style={{
                  transform: `rotate(-${angle}deg)`,
                  transformOrigin: 'bottom left'
                }}
              >
                <div className="w-full h-0.5 bg-white/30" />
                <div className="absolute top-0 right-0">
                  <ArrowRight className="w-4 h-4 text-white/30" />
                </div>
              </div>

              {/* Projectile */}
              <motion.div
                animate={projectileControls}
                className="absolute bottom-0 left-0"
                style={{ x: 0, y: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 -translate-x-1/2 -translate-y-1/2"
                >
                  <Atom className="w-full h-full text-purple-300" />
                </motion.div>
              </motion.div>

              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-3">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border border-white/5" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhysicsLab;