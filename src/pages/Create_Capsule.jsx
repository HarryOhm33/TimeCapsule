import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/LoadingSpinner";

const Create_Capsule = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [sendToLovedOne, setSendToLovedOne] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic Validation
    if (
      !title ||
      !selectedDate ||
      (sendToLovedOne && !recipientEmail) ||
      (!sendToLovedOne && !message)
    ) {
      alert("⚠️ Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", selectedDate);

      // Conditionally include message or recipientEmail
      if (sendToLovedOne) {
        formData.append("recipientEmail", recipientEmail);
      } else {
        formData.append("message", message);
      }

      if (file) {
        formData.append("image", file);
      }

      console.log("🚀 Sending FormData:", [...formData.entries()]);

      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const apiEndpoint = sendToLovedOne
        ? `${API_BASE_URL}/api/capsule/create`
        : `${API_BASE_URL}/api/mycapsule/`;

      const token = localStorage.getItem("token");

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Add this to authenticate request
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          sendToLovedOne
            ? "🎉 Capsule sent to your loved one!"
            : "🎉 Capsule Created Successfully!"
        );
        resetForm();
        navigate("/dashboard");
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Error creating capsule:", error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset Function
  const resetForm = () => {
    setTitle("");
    setMessage("");
    setSelectedDate("");
    setFile(null);
    setRecipientEmail("");
    setSendToLovedOne(false);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      alert("❌ Only image files are allowed!");
      return;
    }

    setFile(selectedFile);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-20 pb-10 relative overflow-hidden">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Background Shapes */}
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

          {/* Glassy Card & Form */}
          <motion.div
            className="relative w-full max-w-3xl bg-gray-800/50 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-gray-600/50 z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Create Your Time Capsule
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
                placeholder="Write a message for your future self..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <input
                type="date"
                className="mt-4 p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400 uppercase"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              {/* ✅ Drag & Drop Box with GIF */}
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

              {/* Send to Loved One */}
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sendToLovedOne"
                  className="w-5 h-5 accent-blue-500"
                  checked={sendToLovedOne}
                  onChange={() => setSendToLovedOne(!sendToLovedOne)}
                />
                <label htmlFor="sendToLovedOne" className="text-gray-300">
                  Send to a Loved One
                </label>
              </div>

              {sendToLovedOne && (
                <input
                  type="email"
                  className="mt-4 p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400"
                  placeholder="Enter recipient's email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required={sendToLovedOne}
                />
              )}

              <motion.button
                type="submit"
                className="mt-6 px-5 py-3 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Capsule
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Create_Capsule;
