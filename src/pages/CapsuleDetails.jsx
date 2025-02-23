import React, { useMemo, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Spinner from "../components/LoadingSpinner"; // ✅ Import Spinner

const CapsuleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("⚠️ No token found. User might not be logged in.");
          return;
        }

        const { data } = await axios.get(
          `${API_BASE_URL}/api/mycapsule/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("✅ Capsule Data:", data);
        setCapsule(data);
      } catch (error) {
        console.error(
          "❌ Error fetching capsule:",
          error.response || error.message
        );

        if (error.response?.status === 401) {
          alert("⚠️ Unauthorized. Please log in again.");
          navigate("/auth");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this capsule?"
    );
    if (!confirmDelete) return;

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      if (!token) {
        alert("⚠️ You are not logged in. Please log in first.");
        return;
      }

      await axios.delete(`${API_BASE_URL}/api/mycapsule/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Capsule deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error deleting capsule:", error);
      alert(
        `❌ Failed to delete capsule: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <Spinner /> {/* ✅ Show Loading Spinner */}
      </div>
    );
  }

  if (!capsule) {
    return (
      <div className="text-center text-gray-400 pt-32">
        ❌ Capsule Not Found
      </div>
    );
  }

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

      {/* Capsule Details */}
      <motion.div
        className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-gray-700/50 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent pb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {capsule.title}
        </motion.h1>

        {capsule.imageUrl && (
          <motion.img
            src={capsule.imageUrl}
            alt={capsule.title}
            className="w-full h-64 object-cover rounded-lg shadow-md mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
        )}

        <p className="text-gray-300 mt-4">
          {capsule.message || "No message available."}
        </p>

        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
          <p className="text-sm text-gray-400">
            <span className="text-cyan-300">📅 Created At:</span>{" "}
            {formatDate(capsule.createdAt)}
          </p>
          <p className="text-sm text-gray-400">
            <span className="text-green-300">⏳ Unlock Date:</span>{" "}
            {formatDate(capsule.date)}
          </p>
          <p className="text-sm text-gray-400">
            <span className="text-yellow-300">🔄 Last Updated:</span>{" "}
            {formatDate(capsule.updatedAt)}
          </p>
        </div>

        {capsule.tags && capsule.tags.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {capsule.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Link
            to={`/dashboard/update-capsule/${capsule._id}`}
            className="px-5 py-3 bg-blue-500 text-black font-semibold rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            ✏️ Update Capsule
          </Link>
          <motion.button
            onClick={handleDelete}
            className="px-5 py-3 bg-red-500 text-black font-semibold rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🗑 Delete Capsule
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CapsuleDetails;
