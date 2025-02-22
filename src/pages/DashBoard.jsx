import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  // Sample data for the dashboard
  const user = {
    name: "John Doe",
    profilePicture: "https://via.placeholder.com/150",
    bio: "Time capsule enthusiast 🕰️",
    storageUsage: "1.2GB / 5GB",
  };

  const stats = [
    {
      title: "Created Capsules",
      value: "12",
      icon: "📦",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Capsules Waiting",
      value: "3",
      icon: "⏳",
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Media Uploaded",
      value: "45",
      icon: "📷",
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Recent Activity",
      value: "2 days ago",
      icon: "🕒",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  const capsules = [
    {
      title: "Summer 2023",
      unlockDate: "2025-06-01",
      thumbnail: "https://via.placeholder.com/150",
      status: "locked",
    },
    {
      title: "Graduation Day",
      unlockDate: "2024-05-15",
      thumbnail: "https://via.placeholder.com/150",
      status: "locked",
    },
    {
      title: "Family Reunion",
      unlockDate: "2023-12-25",
      thumbnail: "https://via.placeholder.com/150",
      status: "unlocked",
    },
  ];

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

  // Particles for background animation
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

  // Floating shapes for background animation
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-24 pb-8 px-8 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {shapes.map((shape, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${
              shape.type === "circle" ? "rounded-full" : "rounded-lg"
            } bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-3xl`}
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
      </div>

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
            zIndex: -1, // Ensure particles are above shapes but below content
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

      {/* Main Content */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-400 mt-2">
            Here's what's happening with your time capsules.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg backdrop-blur-lg relative overflow-hidden group`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p className="text-gray-300">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Capsules Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Your Capsules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capsules.map((capsule, index) => (
              <motion.div
                key={capsule.title}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50 relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {capsule.status === "locked" ? "🔒" : "🔓"}
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  {capsule.title}
                </h3>
                <p className="text-gray-400">
                  Unlocks on: {capsule.unlockDate}
                </p>
              </motion.div>
            ))}
          </div>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
            Create New Capsule
          </button>
        </motion.div>

        {/* Notifications Panel */}
        <motion.div
          className="mb-8"
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
        </motion.div>

        {/* User Profile Overview */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Your Profile
          </h2>
          <div className="flex items-center space-x-6 bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-16 h-16 rounded-full"
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
      </div>
    </div>
  );
};

export default Dashboard;
