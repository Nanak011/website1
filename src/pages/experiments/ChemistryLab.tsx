import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeakerIcon, Droplets, Flame, Wind, AlertTriangle } from 'lucide-react';

interface Chemical {
  id: string;
  name: string;
  color: string;
  type: 'acid' | 'base' | 'salt' | 'metal' | 'organic';
  formula: string;
  ph?: number;
  concentration?: number;
}

interface Reaction {
  result: string;
  color: string;
  effects: ('heat' | 'bubbles' | 'smoke' | 'precipitate')[];
  equation: string;
  description: string;
  hazards?: string[];
  temperature_change?: number; // in °C
  gas_evolution?: string;
  precipitate_color?: string;
}

const chemicals: Chemical[] = [
  { id: 'hcl', name: 'Hydrochloric Acid', formula: 'HCl', color: 'bg-yellow-200', type: 'acid', ph: 0, concentration: 0.1 },
  { id: 'naoh', name: 'Sodium Hydroxide', formula: 'NaOH', color: 'bg-blue-200', type: 'base', ph: 14, concentration: 0.1 },
  { id: 'cuso4', name: 'Copper Sulfate', formula: 'CuSO₄', color: 'bg-blue-500', type: 'salt', concentration: 0.5 },
  { id: 'zn', name: 'Zinc', formula: 'Zn', color: 'bg-gray-400', type: 'metal' },
  { id: 'agno3', name: 'Silver Nitrate', formula: 'AgNO₃', color: 'bg-gray-200', type: 'salt', concentration: 0.1 },
  { id: 'h2so4', name: 'Sulfuric Acid', formula: 'H₂SO₄', color: 'bg-yellow-300', type: 'acid', ph: 0, concentration: 0.1 },
  { id: 'nacl', name: 'Sodium Chloride', formula: 'NaCl', color: 'bg-white', type: 'salt', concentration: 0.5 },
  { id: 'koh', name: 'Potassium Hydroxide', formula: 'KOH', color: 'bg-purple-200', type: 'base', ph: 14, concentration: 0.1 },
  { id: 'fe', name: 'Iron', formula: 'Fe', color: 'bg-gray-600', type: 'metal' },
  { id: 'ch3cooh', name: 'Acetic Acid', formula: 'CH₃COOH', color: 'bg-yellow-100', type: 'organic', ph: 3, concentration: 0.1 }
];

const ChemistryLab = () => {
  const [selectedChemicals, setSelectedChemicals] = useState<Chemical[]>([]);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent, chemical: Chemical) => {
    e.dataTransfer.setData('chemical', JSON.stringify(chemical));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const chemical = JSON.parse(e.dataTransfer.getData('chemical')) as Chemical;
    
    if (selectedChemicals.length < 2) {
      setSelectedChemicals([...selectedChemicals, chemical]);
      
      if (selectedChemicals.length === 1) {
        calculateReaction([...selectedChemicals, chemical]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const calculateReaction = (chemicals: Chemical[]) => {
    const [first, second] = chemicals;
    
    // Real chemical reactions based on actual chemistry
    if (first.id === 'hcl' && second.id === 'naoh') {
      setReaction({
        result: 'Neutralization Reaction',
        color: 'bg-blue-200',
        effects: ['heat'],
        equation: 'HCl + NaOH → NaCl + H₂O',
        description: 'Acid-base neutralization forming sodium chloride and water. Exothermic reaction.',
        hazards: ['Heat generation'],
        temperature_change: 15
      });
    } else if (first.id === 'hcl' && second.id === 'zn') {
      setReaction({
        result: 'Single Displacement',
        color: 'bg-gray-300',
        effects: ['bubbles', 'heat'],
        equation: '2HCl + Zn → ZnCl₂ + H₂',
        description: 'Zinc metal reacts with hydrochloric acid to produce zinc chloride and hydrogen gas.',
        hazards: ['Flammable hydrogen gas', 'Heat generation'],
        temperature_change: 25,
        gas_evolution: 'H₂'
      });
    } else if (first.id === 'agno3' && second.id === 'nacl') {
      setReaction({
        result: 'Double Displacement',
        color: 'bg-white',
        effects: ['precipitate'],
        equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
        description: 'Silver nitrate reacts with sodium chloride to form silver chloride precipitate and sodium nitrate.',
        hazards: ['Light sensitive silver chloride'],
        precipitate_color: 'white'
      });
    } else if (first.id === 'cuso4' && second.id === 'fe') {
      setReaction({
        result: 'Single Displacement',
        color: 'bg-green-300',
        effects: ['heat'],
        equation: 'CuSO₄ + Fe → FeSO₄ + Cu',
        description: 'Iron displaces copper from copper sulfate solution, forming iron sulfate and copper metal.',
        hazards: ['Metal precipitation'],
        temperature_change: 10
      });
    } else if ((first.type === 'acid' && second.type === 'base') || (first.type === 'base' && second.type === 'acid')) {
      setReaction({
        result: 'Neutralization',
        color: 'bg-blue-200',
        effects: ['heat'],
        equation: `${first.formula} + ${second.formula} → Salt + H₂O`,
        description: 'Acid-base neutralization forming a salt and water.',
        hazards: ['Heat generation'],
        temperature_change: 15
      });
    } else {
      setReaction({
        result: 'No Significant Reaction',
        color: 'bg-gray-200',
        effects: [],
        equation: `${first.formula} + ${second.formula} → No reaction`,
        description: 'These chemicals do not react significantly with each other.',
        hazards: []
      });
    }
  };

  const resetExperiment = () => {
    setSelectedChemicals([]);
    setReaction(null);
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
          <h1 className="text-4xl font-bold text-white mb-4">Chemistry Lab</h1>
          <p className="text-purple-200 text-lg">Drag and mix chemicals to observe reactions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chemical Rack */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Chemical Rack</h2>
            <div className="grid grid-cols-2 gap-4">
              {chemicals.map((chemical) => (
                <motion.div
                  key={chemical.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, chemical)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${chemical.color} p-4 rounded-lg cursor-grab active:cursor-grabbing text-center relative`}
                >
                  <div className="h-20 flex items-center justify-center">
                    <BeakerIcon className="w-12 h-12 text-gray-700" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-2">{chemical.name}</p>
                  <p className="text-xs text-gray-600">{chemical.formula}</p>
                  {chemical.ph && (
                    <p className="text-xs text-gray-600">pH: {chemical.ph}</p>
                  )}
                  {chemical.concentration && (
                    <p className="text-xs text-gray-600">{chemical.concentration}M</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mixing Area */}
          <div className="lg:col-span-2">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 h-full"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Mixing Area</h2>
              
              <div className="flex flex-col items-center space-y-8">
                {/* Beaker */}
                <div className="relative">
                  <motion.div
                    className={`w-48 h-64 border-4 border-white/30 rounded-b-3xl relative ${
                      reaction ? reaction.color : 'bg-white/5'
                    } transition-colors duration-500`}
                  >
                    {/* Selected Chemicals */}
                    <AnimatePresence>
                      {selectedChemicals.map((chemical, index) => (
                        <motion.div
                          key={`${chemical.id}-${index}`}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          className={`absolute bottom-0 left-0 right-0 h-1/2 ${chemical.color} transition-all duration-300`}
                          style={{
                            height: `${50 - index * 25}%`,
                            zIndex: 10 - index,
                          }}
                        />
                      ))}
                    </AnimatePresence>

                    {/* Reaction Effects */}
                    {reaction && (
                      <>
                        {reaction.effects.includes('heat') && (
                          <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                          >
                            <Flame className="w-8 h-8 text-orange-500" />
                          </motion.div>
                        )}
                        {reaction.effects.includes('bubbles') && (
                          <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                          >
                            <Droplets className="w-6 h-6 text-white/50" />
                          </motion.div>
                        )}
                        {reaction.effects.includes('smoke') && (
                          <motion.div
                            animate={{ y: [0, -30, 0], opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                          >
                            <Wind className="w-8 h-8 text-gray-300" />
                          </motion.div>
                        )}
                      </>
                    )}
                  </motion.div>
                </div>

                {/* Reaction Information */}
                {reaction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                  >
                    <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
                      <h3 className="text-white font-semibold mb-2">{reaction.result}</h3>
                      <p className="text-purple-200 text-sm mb-2 font-mono">{reaction.equation}</p>
                      <p className="text-purple-200 text-sm mb-2">{reaction.description}</p>
                      
                      {reaction.temperature_change && (
                        <p className="text-purple-200 text-sm mb-2">
                          Temperature Change: +{reaction.temperature_change}°C
                        </p>
                      )}
                      
                      {reaction.gas_evolution && (
                        <p className="text-purple-200 text-sm mb-2">
                          Gas Evolved: {reaction.gas_evolution}
                        </p>
                      )}
                      
                      {reaction.precipitate_color && (
                        <p className="text-purple-200 text-sm mb-2">
                          Precipitate Color: {reaction.precipitate_color}
                        </p>
                      )}

                      {reaction.hazards && reaction.hazards.length > 0 && (
                        <div className="flex items-center space-x-2 text-yellow-300">
                          <AlertTriangle className="w-4 h-4" />
                          <p className="text-sm">{reaction.hazards.join(', ')}</p>
                        </div>
                      )}
                      
                      <button
                        onClick={resetExperiment}
                        className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Reset Experiment
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChemistryLab;