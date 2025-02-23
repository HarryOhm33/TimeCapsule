import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaCircleExclamation } from "react-icons/fa6";
import toast from "react-hot-toast";

const images = [
  {
    url: "https://www.oyorooms.com/blog/wp-content/uploads/2017/10/Feature-Image-min-14.jpg",
    year: 2017,
  },
  {
    url: "https://lh7-us.googleusercontent.com/0ok5LCBmiioUwTpavyKDguR4QoTnyVLOFmoXAgfUjveBxNWgPXQ4aSMyLdzJsuRpryUakHdWOEOnzx3dH2cmapaXxOOWjbPAuh_dG4NBOtYcwinKhXQmThJfsoD5bwF3HxH5yekfXo9c-0jhpoCH1g",
    year: 2020,
  },
  {
    url: "https://www.loksatta.com/wp-content/uploads/2024/11/Reshma-Shinde-Pavan-Wedding-Photos-1.jpg",
    year: 2024,
  },
  {
    url: "https://cdn.siasat.com/wp-content/uploads/2022/11/kartik-aaryan-1.jpg",
    year: 2022,
  },
  {
    url: "https://static.sociofyme.com/photo/116104409/116104409.jpg",
    year: 2019,
  },
];

export default function GuessTheAge() {
  const [imageData, setImageData] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  // Background particles animation
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

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImageData(randomImage);
    setAttempts(3);
    setShowHint(false);
    setWrongAttempts(0);
  };

  const handleSubmit = () => {
    const guessedYear = parseInt(guess, 10);
    if (!guessedYear || !imageData) return;

    const difference = Math.abs(imageData.year - guessedYear);
    let points = Math.max(100 - difference, 0);

    if (difference === 0) {
      setScore((prevScore) => prevScore + 100);
      setMessage("🎯 Spot on! 100 points!");
      setTimeout(() => {
        setMessage("");
        setGuess("");
        fetchRandomImage();
      }, 2000);
    } else {
      setMessage(`You were ${difference} years off! 🕰`);
      setAttempts((prevAttempts) => prevAttempts - 1);
      setWrongAttempts((prevWrongAttempts) => prevWrongAttempts + 1);
      if (wrongAttempts + 1 === 2) {
        setShowHint(true);
      }
      if (attempts - 1 === 0) {
        setTimeout(() => {
          setMessage("No more attempts! Moving to next image.");
          setGuess("");
          fetchRandomImage();
        }, 2000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-15 relative overflow-hidden">
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

      {/* Game Container */}
      <motion.div
        className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-lg shadow-2xl text-center max-w-md border border-gray-700/50 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold mb-4 text-yellow-400">
          🎭 Guess the Year!
        </h2>
        <p className="text-blue-300 mb-2">Can you guess the correct year?</p>

        {/* Score and Attempts */}
        <div className="flex justify-center gap-4 mb-4">
          <p className="text-lg font-semibold text-green-300 bg-gray-800 px-4 py-2 rounded-lg">
            Score: {score}
          </p>
          <p className="text-lg font-semibold text-red-300 bg-gray-800 px-4 py-2 rounded-lg">
            Attempts: {attempts}
          </p>
        </div>

        {/* Image */}
        {imageData && (
          <img
            src={imageData.url}
            alt="Guess Image"
            className="w-64 h-64 object-cover rounded-lg shadow-lg border-4 border-gray-600 mx-auto"
          />
        )}

        {/* Input and Hint */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Enter year..."
              className="p-2 border border-gray-400 rounded-lg text-center w-24 bg-gray-800 text-white"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <FaCircleExclamation
              className={`text-yellow-400 cursor-pointer ${
                showHint ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() =>
                showHint &&
                toast.success(
                  `Hint: The picture was taken around ${
                    imageData.year - Math.floor(Math.random() * 3)
                  }!`
                )
              }
            />
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit ✅
          </motion.button>
        </div>

        {/* Message */}
        {message && (
          <p className="mt-3 text-lg font-bold text-yellow-400">{message}</p>
        )}
      </motion.div>
    </div>
  );
}
