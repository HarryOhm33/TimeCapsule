import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  // Create refs for each section
  const heroRef = React.useRef(null);
  const significanceRef = React.useRef(null);
  const techRef = React.useRef(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: false, margin: "-100px" });
  const significanceInView = useInView(significanceRef, {
    once: false,
    margin: "-100px",
  });
  const techInView = useInView(techRef, { once: false, margin: "-100px" });

  // Enhanced particles with more variety
  const particles = React.useMemo(
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

  // Floating shapes for background
  const shapes = React.useMemo(
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

  const features = [
    {
      title: "Preserve Memories",
      description: "Save your precious moments securely for years to come.",
      icon: "📸",
    },
    {
      title: "Reflect on Growth",
      description: "Track your journey and see how far you've come.",
      icon: "🌱",
    },
    {
      title: "Share with Future",
      description: "Create lasting legacies for future generations.",
      icon: "🎁",
    },
  ];

  const techStack = [
    { name: "React", icon: "⚛️", color: "from-blue-400 to-blue-600" },
    { name: "Vite", icon: "⚡", color: "from-purple-400 to-purple-600" },
    { name: "TailwindCSS", icon: "🎨", color: "from-teal-400 to-teal-600" },
    { name: "MongoDB", icon: "🍃", color: "from-green-400 to-green-600" },
    { name: "Node.js", icon: "🚀", color: "from-yellow-400 to-yellow-600" },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative overflow-hidden">
      {/* Full-Page Background Animation */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Background shapes */}
        {shapes.map((shape, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${
              shape.type === "circle" ? "rounded-full" : "rounded-lg"
            } bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-3xl opacity-20`} // Reduced opacity
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
              particle.blur ? "bg-cyan-400/10" : "bg-cyan-400/20" // Reduced opacity
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden"
      >
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          style={{ y }}
          animate={{
            opacity: heroInView ? 1 : 0,
            y: heroInView ? 0 : 20,
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6"
            animate={{
              scale: heroInView ? 1 : 0.9,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 0.5,
              backgroundPosition: {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            Preserve Moments. Unlock Memories.
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            animate={{ opacity: heroInView ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            Create digital time capsules to relive your most cherished memories
            in the future.
          </motion.p>

          <div className="flex justify-center">
            <motion.div
              className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-base font-semibold shadow-lg relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: "pointer", maxWidth: "200px" }} // Adjust maxWidth as needed
            >
              <Link to="/dashboard" className="block w-full h-full">
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Start Your Journey</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        ref={significanceRef}
        className="min-h-screen py-20 px-4 relative overflow-hidden"
      >
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          animate={{
            opacity: significanceInView ? 1 : 0,
            y: significanceInView ? 0 : 30,
          }}
          transition={{ duration: 0.9 }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Why Time Capsules?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50 relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: significanceInView ? 1 : 0,
                  y: significanceInView ? 0 : 20,
                }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <section ref={techRef} className="min-h-screen py-20 px-4 relative">
        <motion.div
          className="max-w-6xl mx-auto"
          animate={{
            opacity: techInView ? 1 : 0,
            y: techInView ? 0 : 50,
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Built with Modern Tech
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                className={`bg-gradient-to-br ${tech.color} p-6 rounded-lg shadow-lg backdrop-blur-lg text-center relative group overflow-hidden`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: techInView ? 1 : 0,
                  scale: techInView ? 1 : 0.5,
                }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {tech.icon}
                </motion.div>
                <p className="font-semibold relative z-10">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
