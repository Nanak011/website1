import React from 'react';
import { motion } from 'framer-motion';
import { BeakerIcon, Atom, Dna, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuestLab = () => {
  const experiments = [
    {
      title: 'Chemistry',
      icon: BeakerIcon,
      description: 'Basic chemical reactions and experiments',
      path: '/guest/chemistry',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Physics',
      icon: Atom,
      description: 'Simple physics simulations',
      path: '/guest/physics',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Biology',
      icon: Dna,
      description: 'Explore basic biological concepts',
      path: '/guest/biology',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Mathematics',
      icon: Calculator,
      description: 'Interactive math problems',
      path: '/guest/mathematics',
      color: 'from-yellow-500 to-orange-500'
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
          <h1 className="text-4xl font-bold text-white mb-4">Guest Laboratory</h1>
          <p className="text-purple-200 text-lg">Try out our basic experiments without an account</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {experiments.map((experiment, index) => (
            <Link to={experiment.path} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${experiment.color} p-4 mb-6 mx-auto`}>
                  <experiment.icon className="w-full h-full text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-3 text-center">{experiment.title}</h2>
                <p className="text-purple-200 text-center">{experiment.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-purple-200">
            Want access to all features?{' '}
            <Link to="/register" className="text-purple-300 hover:text-purple-100 underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GuestLab;