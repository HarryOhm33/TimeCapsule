import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "../components/LoadingSpinner";

const Update_Capsule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // ✅ Store existing image URL
  const [tags, setTags] = useState([]); // ✅ Store tags
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        setLoading(true);
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000";

        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found! Please log in again.");
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
          setImageUrl(data.imageUrl); // ✅ Set image URL
          setTags(data.tags || []); // ✅ Set tags
        } else {
          alert("Failed to fetch capsule details.");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching capsule:", error);
        alert("Something went wrong!");
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
      alert("⚠️ Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please log in again.");
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
        alert("🎉 Capsule updated successfully!");
        navigate(`/dashboard/capsule/${id}`);
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Error updating capsule:", error);
      alert("Something went wrong. Please try again.");
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-20 pb-10 relative overflow-hidden">
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

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Capsule"
              className="w-full h-48 object-cover rounded-lg mt-4"
            />
          )}

          {tags.length > 0 && (
            <div className="flex gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-gray-700 text-cyan-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

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

            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <motion.button
              type="submit"
              className="mt-6 px-5 py-3 w-full text-lg font-semibold rounded-lg transition-all 
                        bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 
                        focus:ring focus:ring-cyan-400 shadow-lg transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Update Capsule
            </motion.button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default Update_Capsule;
