import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BeakerIcon, UserIcon, Users } from "lucide-react";
import logo from "../assets/logo.png"; // Ensure the path is correct

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-white/10 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* LOGO with BLAST Animation in the top-left corner */}
      <motion.img
        src={logo}
        alt="eLab Logo"
        className="absolute -top-10 -left-2 w-40 h-45 drop-shadow-2xl" // Increased size to w-40 h-40 and added drop-shadow-2xl
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, type: "spring", stiffness: 120 }} // Blast animation
      />

      {/* Main Content */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="relative z-10 text-center mb-12"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <BeakerIcon className="w-24 h-24 text-purple-300 mb-4" />
        </motion.div>
        <h1 className="text-5xl font-bold text-white mb-4">e-Lab</h1>
        <p className="text-purple-200 text-xl mb-8">Experience science like never before</p>
      </motion.div>

      {/* Navigation Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative z-10">
        <Link to="/login">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all group"
          >
            <UserIcon className="w-12 h-12 text-purple-300 mx-auto mb-4 group-hover:text-purple-200" />
            <h2 className="text-xl font-semibold text-white mb-2">Login</h2>
            <p className="text-purple-200">Access your student or teacher account</p>
          </motion.div>
        </Link>

        <Link to="/register">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all group"
          >
            <Users className="w-12 h-12 text-purple-300 mx-auto mb-4 group-hover:text-purple-200" />
            <h2 className="text-xl font-semibold text-white mb-2">Register</h2>
            <p className="text-purple-200">Create a new account</p>
          </motion.div>
        </Link>

        <Link to="/guest">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all group"
          >
            <BeakerIcon className="w-12 h-12 text-purple-300 mx-auto mb-4 group-hover:text-purple-200" />
            <h2 className="text-xl font-semibold text-white mb-2">Guest Mode</h2>
            <p className="text-purple-200">Try basic experiments without an account</p>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;
