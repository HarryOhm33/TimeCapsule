import React, { useMemo, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Pointer } from "lucide-react";

const CapsuleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState(null);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const { data } = await axios.get(`/api/mycapsule/${id}`);
        setCapsule(data);
      } catch (error) {
        console.error("Error fetching capsule:", error);
      }
    };
    fetchCapsule();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this capsule?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/mycapsule/${id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting capsule:", error);
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

  if (!capsule)
    return (
      <div className="text-center text-gray-400 pt-32">Loading Capsule...</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-24 pb-8 px-8 relative overflow-hidden">
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
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img
              src={capsule.imageUrl}
              alt={capsule.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        )}

        <motion.div
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-300">{capsule.message}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">
              Unlock Date
            </h3>
            <p className="text-gray-300">
              {new Date(capsule.date).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50">
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
          </div>
        </motion.div>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            to={`/dashboard/update-capsule/${capsule._id}`}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Update Capsule
          </Link>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200 hover:cursor-pointer"
          >
            Delete Capsule
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CapsuleDetails;
