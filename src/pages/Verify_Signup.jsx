import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const Verify_Signup = () => {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Get the email from the signup page
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/"); // ✅ Immediate redirect to home if email is missing
    }
  }, [email, navigate]);

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    const API_BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/verify-otp`, // ✅ Correct - Uses environment variable
        { email, otp },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Verification Response:", response.data);

      if (
        response.data.message ===
        "Account verified and registered. You can now log in."
      ) {
        localStorage.setItem("token", response.data.token);
        navigate("/auth/success");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      if (error.response) {
        setError(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please check your connection.");
      }
    }
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative overflow-hidden">
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

      {/* Glassy card */}
      <motion.div
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-gray-600/50 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Verify Signup
        </h2>
        <p className="mt-2 text-sm text-gray-400 text-center">
          Enter the OTP sent to your email
        </p>

        {!verified ? (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="mt-4 p-3 w-full border border-gray-600 rounded-lg shadow-sm bg-gray-700/50 text-gray-300 focus:ring focus:ring-cyan-400 focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {error && (
              <p className="mt-2 text-sm text-red-400 text-center">{error}</p>
            )}
            <motion.button
              className="mt-4 w-full px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </motion.button>
          </>
        ) : (
          <p className="mt-4 text-green-400 text-center text-lg font-semibold">
            OTP Verified Successfully! Redirecting to dashboard...
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Verify_Signup;
