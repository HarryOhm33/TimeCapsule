import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "../components/LoadingSpinner";
import { toast } from "react-hot-toast";

const Update_Capsule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Enhanced particles with more variety
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

  // Floating shapes for background
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

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        setLoading(true);
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000";

        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found! Please log in again.");
          return navigate("/login");
        }

        const response = await fetch(`${API_BASE_URL}/api/mycapsule/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setTitle(data.title);
          setMessage(data.message);
          setSelectedDate(new Date(data.date).toISOString().split("T")[0]);
        } else {
          toast.error("Failed to fetch capsule details.");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching capsule:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !selectedDate || !message) {
      toast.error("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Session expired. Please log in again.");
        return navigate("/login");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", selectedDate);
      formData.append("message", message);
      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(`${API_BASE_URL}/api/mycapsule/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("🎉 Capsule updated successfully!");
        navigate(`/dashboard/capsule/${id}`);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Error updating capsule:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-20 pb-10 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] animate-pulse-slow"></div>

      {/* Animated Particles */}
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
            zIndex: 1, // Ensure particles are below other elements
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

      {/* Floating Shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          className={`absolute ${
            shape.type === "circle" ? "rounded-full" : ""
          } bg-cyan-400/10`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            rotate: shape.rotation,
            zIndex: 1, // Ensure shapes are below other elements
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* Main Content */}
      {loading ? (
        <Spinner />
      ) : (
        <motion.div
          className="relative w-full max-w-3xl bg-gray-800/50 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-gray-600/50 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Update Your Time Capsule
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="mt-4 p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400"
              placeholder="Capsule Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="mt-4 p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400"
              placeholder="Update your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <input
              type="date"
              className="mt-4 p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400 uppercase"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            {/* Drag & Drop Box with GIF */}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`mt-4 p-6 w-full border-2 ${
                isDragging
                  ? "border-cyan-500 bg-gray-700/40"
                  : "border-gray-600"
              } border-dashed rounded-lg text-center cursor-pointer relative flex items-center justify-center`}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <img
                src="https://media1.giphy.com/media/wAOrqVpbJdfDAjwcSN/giphy.gif?cid=6c09b9527ryil4hk9ve7vcmwn33pausa3zy58f16odnce16l&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                alt="Upload Animation"
                className="w-16 h-16 object-contain opacity-90"
              />
              <p className="absolute bottom-3 text-gray-300 text-sm">
                {file
                  ? `📁 ${file.name}`
                  : isDragging
                  ? "🚀 Drop your file here!"
                  : "Drag & Drop your file or Click to Choose"}
              </p>
            </div>

            <motion.button
              type="submit"
              className="mt-6 px-5 py-3 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Capsule
            </motion.button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default Update_Capsule;
