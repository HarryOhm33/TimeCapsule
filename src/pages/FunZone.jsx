import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FunZone = () => {
  // Background particles animation
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 8 + 4,
        blur: Math.random() > 0.5,
      })),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-24 pb-8 px-8 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${
              particle.blur ? "bg-cyan-400/10" : "bg-cyan-400/20"
            }`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              filter: particle.blur ? "blur(4px)" : "none",
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1
          className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎮 Fun Zone
        </motion.h1>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Memory Challenge Card */}
          <motion.div
            className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-gray-700/30 hover:border-cyan-400/50 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/memory-challenge">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                  🧠 Memory Challenge
                </h2>
                <p className="text-gray-300 mb-6">
                  Test your memory skills by matching icons in this fun and
                  challenging game!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/fun-zone/memory-game">
                    {" "}
                    {/* Replace with your desired route */}
                    <button className="px-6 py-3 bg-cyan-500/10 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/20 transition-colors">
                      Play Now →
                    </button>
                  </Link>
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Guess the Age Card */}
          <motion.div
            className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-gray-700/30 hover:border-purple-400/50 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/guess-the-age">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-purple-400 mb-4">
                  🎂 Guess the Age
                </h2>
                <p className="text-gray-300 mb-6">
                  Can you guess the correct age? Test your intuition in this
                  exciting guessing game!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/fun-zone/guess-the-age">
                    {" "}
                    {/* Replace with your desired route */}
                    <button className="px-6 py-3 bg-purple-500/10 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/20 transition-colors">
                      Play Now →
                    </button>
                  </Link>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FunZone;
