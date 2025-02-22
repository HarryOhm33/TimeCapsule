import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const Create_Capsule = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [sendToLovedOne, setSendToLovedOne] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-20 pb-10 relative overflow-hidden">
      {/* Background shapes */}
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

      {/* Animated particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute rounded-full ${
            particle.blur ? "bg-cyan-400/40" : "bg-cyan-400/60"
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
            opacity: [0.4, 0.8, 0.4],
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
        className="relative w-full max-w-3xl bg-gray-800/50 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-gray-600/50 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Create Your Time Capsule
        </h2>

        <input
          type="text"
          className="mt-4 p-3 w-full border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400"
          placeholder="Capsule Title"
        />

        <textarea
          className="mt-4 p-3 w-full border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400"
          placeholder="Write a message for your future self..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <input
          type="date"
          className="mt-4 p-3 w-full border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400 uppercase"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <input
          type="file"
          className="mt-4 p-3 w-full border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-cyan-400 file:rounded-md file:bg-cyan-400/10 file:text-cyan-400 file:hover:bg-cyan-400/20 file:hover:border-cyan-500 file:transition file:duration-200 file:cursor-pointer"
          onChange={handleFileChange}
        />
        {file && (
          <p className="mt-2 text-sm text-gray-400">
            Selected file: {file.name}
          </p>
        )}

        {/* Drag and Drop Box with GIF */}
        <div
          className="mt-4 p-3 w-full h-28 border border-gray-400 border-dashed rounded-lg bg-gray-700 text-gray-300 text-center cursor-pointer relative flex items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFile(e.dataTransfer.files[0]);
          }}
        >
          <img
            src="https://media1.giphy.com/media/wAOrqVpbJdfDAjwcSN/giphy.gif?cid=6c09b9527ryil4hk9ve7vcmwn33pausa3zy58f16odnce16l&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
            alt="Upload Animation"
            className="w-16 h-16 object-contain opacity-90"
          />
          <p className="absolute bottom-3 text-gray-300 text-sm">
            Drag & Drop your file here
          </p>
        </div>

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
            className="mt-4 p-3 w-full border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-300 focus:ring focus:ring-cyan-400"
            placeholder="Enter recipient's email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required={sendToLovedOne}
          />
        )}

        <motion.button
          className="mt-6 px-5 py-3 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Capsule
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Create_Capsule;
