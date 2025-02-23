import React, { useMemo, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

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
        const token = localStorage.getItem("token"); // ✅ Get the auth token from localStorage

        if (!token) {
          console.warn("⚠️ No token found. User might not be logged in.");
          return; // Stop execution if no token
        }

        const { data } = await axios.get(
          `${API_BASE_URL}/api/mycapsule/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // ✅ Include Authorization token
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
          navigate("/auth"); // ✅ Redirect user to login page
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id, navigate]); // ✅ Add `navigate` as a dependency

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this capsule?"
    );
    if (!confirmDelete) return;

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token"); // ✅ Get token

      if (!token) {
        alert("⚠️ You are not logged in. Please log in first.");
        return;
      }

      await axios.delete(`${API_BASE_URL}/api/mycapsule/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in headers
        },
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

  if (loading) {
    return (
      <div className="text-center text-gray-400 pt-32">Loading Capsule...</div>
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
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
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
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
        )}

        <motion.div
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-300">
            {capsule.message || "No message available."}
          </p>
        </motion.div>

        {/* Check if `tags` exist before mapping */}
        {capsule.tags && capsule.tags.length > 0 && (
          <motion.div
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {capsule.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            to={`/dashboard/update-capsule/${capsule._id}`}
            className="btn-primary"
          >
            Update Capsule
          </Link>
          <button onClick={handleDelete} className="btn-danger">
            Delete Capsule
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CapsuleDetails;
