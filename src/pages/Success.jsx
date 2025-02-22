import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Success = () => {
  // Floating shapes for background animation
  const shapes = useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        type: Math.random() > 0.5 ? "circle" : "square",
        size: Math.random() * 300 + 100,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
      })),
    []
  );

  // Animated particles for background animation
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white text-center relative overflow-hidden">
      {/* Background shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          className={`absolute ${
            shape.type === "circle" ? "rounded-full" : "rounded-lg"
          } bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            rotate: shape.rotation,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute rounded-full ${
            particle.blur ? "bg-cyan-400/20" : "bg-cyan-400/40"
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

      {/* Glassy Card */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-700/50 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Signup Successful!
        </motion.h1>
        <p className="text-lg text-gray-400 mb-8">
          You have successfully signed up. Start exploring now!
        </p>
        <Link to="/auth">
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg text-white hover:from-cyan-600 hover:to-blue-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign In Now!
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Success;
