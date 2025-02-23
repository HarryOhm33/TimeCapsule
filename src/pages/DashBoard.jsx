import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [capsules, setCapsules] = useState([]); // ✅ Default to an empty array

  // Dummy user data
  const user = {
    name: "John Doe",
    profilePicture: "https://placehold.co/150x150", // ✅ Alternative placeholder
    bio: "Time capsule enthusiast 🕰️",
    storageUsage: "1.2GB / 5GB",
  };

  // Dummy notifications
  const notifications = [
    {
      type: "unlock",
      message: "Your capsule 'Summer 2023' will unlock in 2 years.",
      date: "2025-06-01",
    },
    {
      type: "invite",
      message: "You've been invited to collaborate on 'Friends Trip 2024'.",
      date: "2023-11-01",
    },
  ];

  // Fetch capsules from API
  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ Now it's defined
        setCapsules(Array.isArray(response.data) ? response.data : []); // ✅ Ensure it's an array
      } catch (error) {
        console.error("Error fetching capsules:", error);
        setCapsules([]); // ✅ Prevent `.map()` error
      }
    };

    fetchCapsules();
  }, []);

  // Helper function to check if capsule is openable
  const isOpenable = (unlockDate) => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD
    const unlock = new Date(unlockDate).toISOString().split("T")[0]; // Format unlock date
    return today >= unlock; // Compare dates directly
  };

  // Generate particles
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

  // Generate floating shapes
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-24 pb-8 px-8 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Background shapes */}
        {shapes.map((shape, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${
              shape.type === "circle" ? "rounded-full" : "rounded-lg"
            } bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-3xl opacity-20`}
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

      {/* Greeting */}
      <motion.h1
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hello, {user.name}
      </motion.h1>

      {/* Capsules Section */}
      <motion.div
        className="mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Your Capsules
        </h2>
        {capsules && capsules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capsules.map((capsule) => (
              <motion.div
                key={capsule._id}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">
                  {isOpenable(capsule.date) ? "🔓" : "🔒"}
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  {capsule.title}
                </h3>
                <p className="text-gray-400">
                  Unlocks on: {new Date(capsule.date).toLocaleDateString()}
                </p>
                {isOpenable(capsule.date) && (
                  <Link
                    to={`capsule/${capsule._id}`}
                    className="mt-4 inline-block px-4 py-2 bg-green-500 text-black rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                  >
                    Open Capsule
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center text-2xl font-semibold my-16">
            No Capsules Found!
          </p> // ✅ Prevents `.map()` error
        )}

        <Link to="/create_capsule">
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
            Create New Capsule
          </button>
        </Link>
      </motion.div>

      {/* Notifications Panel */}
      <motion.div
        className="mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Notifications
        </h2>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg hover:bg-gray-700/40 transition-colors duration-200"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center">
                  <span className="text-cyan-400">
                    {notification.type === "unlock" ? "🔔" : "👥"}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{notification.message}</p>
                  <p className="text-sm text-gray-400">{notification.date}</p>
                </div>
              </div>
              <span className="text-sm text-gray-300">View Details</span>
            </motion.div>
          ))}
        </div>

        {/* User Profile Overview */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Your Profile
          </h2>
          <div className="flex items-center space-x-6 bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-16 h-16 rounded-full"
              onError={(e) => (e.target.src = "/default-profile.png")} // ✅ Local fallback image
            />
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-400">{user.bio}</p>
              <p className="text-sm text-gray-400 mt-2">
                Storage: {user.storageUsage}
              </p>
            </div>
            <button className="ml-auto px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
              Edit Profile
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
