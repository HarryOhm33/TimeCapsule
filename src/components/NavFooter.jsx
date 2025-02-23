import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaRocket,
  FaHeart,
} from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Converts token to true/false
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // ✅ Check for token on page load
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Sets true if token exists

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update state
    window.location.href = "/"; // Redirect to Home
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <motion.div
              className="text-2xl font-bold text-cyan-400"
              whileHover={{ scale: 1.05 }}
              style={{ cursor: "pointer" }}
            >
              ⌛ Time Capsule
            </motion.div>

            <div className="hidden md:flex space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{ cursor: "pointer" }}
              >
                <Link
                  to="/"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{ cursor: "pointer" }}
              >
                <Link
                  to="/create_capsule"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Create Capsule →
                </Link>
              </motion.div>
              {/* Add Play Zone Link Here */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{ cursor: "pointer" }}
              >
                <Link
                  to="/fun-zone/memory-game" // Replace with your desired route
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Play Zone 🎮
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ cursor: "pointer" }} // Add pointer cursor
            >
              <Link
                to="/auth" // Use "#" for the to attribute
                className="border border-cyan-400/50 px-4 py-2 rounded-full hover:bg-cyan-400/10 transition-colors text-cyan-400"
              >
                Login
              </Link>
            </motion.div> */}

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {/* ✅ My Dashboard Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/dashboard"
                      className="border border-cyan-400/50 px-4 py-2 rounded-full hover:bg-cyan-400/10 transition-colors text-cyan-400"
                    >
                      My Dashboard
                    </Link>
                  </motion.div>

                  {/* ✅ Logout Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      localStorage.removeItem("token"); // Remove token
                      setIsLoggedIn(false); // Update state
                      window.location.href = "/"; // Redirect to home
                    }}
                    className="bg-red-500 px-4 py-2 rounded-full text-white font-medium hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Logout
                  </motion.div>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/auth"
                    className="bg-cyan-400 px-4 py-2 rounded-full text-gray-900 font-medium hover:bg-cyan-500 transition-colors"
                  >
                    Login/SignUp
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-1">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <motion.div
              className="text-2xl font-bold text-cyan-400 mb-4 flex items-center justify-center md:justify-start"
              whileHover={{ scale: 1.05 }}
            >
              <FaRocket className="mr-2" /> Time Capsule
            </motion.div>
            <p className="text-gray-400">
              Preserving today's moments for tomorrow's memories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">
              Quick Links
            </h3>
            <div className="space-y-3">
              <motion.a
                href="#features"
                className="flex items-center justify-center md:justify-start text-gray-400 hover:text-cyan-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                Features
              </motion.a>
              <motion.a
                href="#about"
                className="flex items-center justify-center md:justify-start text-gray-400 hover:text-cyan-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                About Us
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center justify-center md:justify-start text-gray-400 hover:text-cyan-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                Contact
              </motion.a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">
              Connect With Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors"
                whileHover={{ y: -5 }}
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors"
                whileHover={{ y: -5 }}
              >
                <FaLinkedin className="text-xl" />
              </motion.a>
              <motion.a
                href="mailto:contact@timecapsule.com"
                className="p-3 bg-gray-800 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors"
                whileHover={{ y: -5 }}
              >
                <FaEnvelope className="text-xl" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Tech Stack & Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 mb-4 flex items-center justify-center">
            <FaRocket className="mr-2" /> Built with{" "}
            <FaHeart className="mx-2 text-red-500" /> using React, Vite,
            TailwindCSS, MongoDB & Node.js
          </p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Time Capsule 2.0. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Navbar, Footer };
