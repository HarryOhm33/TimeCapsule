import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-hot-toast";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // API URLs
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const API_URLS = {
    signup: `${API_BASE_URL}/api/auth/signup`,
    signin: `${API_BASE_URL}/api/auth/login`,
  };

  // Background shapes
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

  // Animated particles
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        size: Math.random() * 20 + 10,
        x: Math.random() * 100,
        y: Math.random() * 100,
        blur: Math.random() > 0.5,
        duration: Math.random() * 10 + 5,
      })),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Show spinner when API call starts

    // Check if passwords match during signup
    if (type === "signup" && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      setIsLoading(false); // ✅ Hide spinner on mismatch
      return;
    }

    // Prepare data for backend
    const payload =
      type === "signup"
        ? {
            Name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        : { email: formData.email, password: formData.password };

    try {
      const response = await axios.post(API_URLS[type], payload);
      console.log("API Response:", response.data);

      if (type === "signup") {
        if (
          response.data.message ===
          "OTP sent to email. Verify to complete registration."
        ) {
          // Redirect to OTP verification page with email
          toast.success("Otp Sent!!");
          navigate("/auth/signup/verify", { state: { email: formData.email } });
        } else {
          toast.error("Signup failed. Please try again.");
        }
      } else if (type === "signin") {
        // ✅ Save token in localStorage
        localStorage.setItem("token", response.data.token);

        // ✅ Optionally, save user data if available
        localStorage.setItem("Name", JSON.stringify(response.data.Name));

        // ✅ Reload to reflect login state in Navbar
        window.location.href = "/dashboard";
        toast.success("You Are Now Logged In!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setIsLoading(false); // ✅ Hide spinner on error

      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        toast.error(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        toast.error("An error occurred. Please check your connection.");
      }
    }
    setIsLoading(false); // ✅ Hide spinner when API call ends
  };

  if (isLoading) {
    return <LoadingSpinner />; // ✅ Show spinner when loading is true
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden text-white pt-15">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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

      <div className="relative w-full max-w-3xl h-[500px] bg-gray-800 shadow-lg rounded-lg overflow-hidden flex z-10">
        {/* Sliding Panel */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex flex-col items-center justify-center px-8 z-10"
          animate={{ x: isSignIn ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold">
            {isSignIn ? "Welcome Back!" : "Join Us Today!"}
          </h2>
          <p className="mt-2 text-sm">
            {isSignIn
              ? "Sign in to continue where you left off."
              : "Create an account and explore more!"}
          </p>
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            style={{ cursor: "pointer" }}
            className="mt-4 px-4 py-2 bg-white text-cyan-600 font-semibold rounded-full shadow-md hover:bg-gray-200"
          >
            {!isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </motion.div>

        {/* Sign Up Form */}
        <form
          className="w-1/2 flex flex-col items-center justify-center px-8"
          onSubmit={(e) => handleSubmit(e, "signup")}
        >
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="mt-4 p-2 w-full border rounded-md bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <div className="mt-2 flex items-center">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-full shadow-md hover:bg-cyan-700"
          >
            Sign Up
          </button>
          {/* <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <span
              className="text-cyan-400 cursor-pointer hover:underline"
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </span>
          </p> */}
        </form>

        {/* Sign In Form */}
        <form
          className="w-1/2 flex flex-col items-center justify-center px-8"
          onSubmit={(e) => handleSubmit(e, "signin")}
        >
          <h2 className="text-2xl font-bold text-white">Sign In</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="mt-4 p-2 w-full border rounded-md bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="mt-2 p-2 w-full border rounded-md bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-full shadow-md hover:bg-cyan-700"
          >
            Sign In
          </button>
          {/* <p className="mt-4 text-sm text-gray-400">
            Don't have an account?{" "}
            <span
              className="text-cyan-400 cursor-pointer hover:underline"
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </span>
          </p> */}
          {/* <p className="mt-2 text-sm text-gray-400">Or</p>
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600"
          >
            Continue with Google
          </button> */}
        </form>
      </div>

      {/* Navigation Link Example */}
      <div className="mt-4 text-center">
        <Link
          to="/"
          className="text-cyan-400 hover:text-cyan-300 transition-all duration-300 ease-in-out transform hover:scale-105 inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
