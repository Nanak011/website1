import React from 'react';
import { motion } from 'framer-motion';
import { BeakerIcon, Atom, Dna, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExperimentsPage = () => {
  const experiments = [
    {
      title: 'Chemistry',
      icon: BeakerIcon,
      description: 'Chemical reactions and experiments',
      path: '/experiments/chemistry',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Chemical reactions simulation',
        'pH testing',
        'Titration experiments',
        'Gas evolution observation'
      ]
    },
    {
      title: 'Physics',
      icon: Atom,
      description: 'Physics simulations and measurements',
      path: '/experiments/physics',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Projectile motion',
        'Wave simulation',
        'Force and motion',
        'Energy conservation'
      ]
    },
    {
      title: 'Biology',
      icon: Dna,
      description: 'Biological processes and experiments',
      path: '/experiments/biology',
      color: 'from-green-500 to-emerald-500',
      features: [
        'Blood typing',
        'Cell observation',
        'Genetic inheritance',
        'Enzyme reactions'
      ]
    },
    {
      title: 'Mathematics',
      icon: Calculator,
      description: 'Mathematical concepts and problems',
      path: '/experiments/mathematics',
      color: 'from-yellow-500 to-orange-500',
      features: [
        'Graph plotting',
        'Equation solving',
        'Geometric visualization',
        'Statistical analysis'
      ]
    }
  ];

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
          <h1 className="text-4xl font-bold text-white mb-4">Virtual Experiments</h1>
          <p className="text-purple-200 text-lg">Choose an experiment to begin your exploration</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiments.map((experiment, index) => (
            <Link to={experiment.path} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${experiment.color} p-4 shrink-0`}>
                    <experiment.icon className="w-full h-full text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2">{experiment.title}</h2>
                    <p className="text-purple-200 mb-4">{experiment.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {experiment.features.map((feature, i) => (
                        <div
                          key={i}
                          className="bg-white/5 px-3 py-1 rounded-full text-sm text-purple-200"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperimentsPage;