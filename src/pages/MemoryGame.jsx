import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const allIcons = [
  "🎩",
  "📜",
  "🔑",
  "📸",
  "📅",
  "🎶",
  "🏆",
  "🕰",
  "🎲",
  "🚀",
  "🎉",
  "💡",
];

export default function MemoryQuiz() {
  const [correctIcons, setCorrectIcons] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [stage, setStage] = useState("memorize");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [showMessage, setShowMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(100);

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
    startGame();
  }, [level]);

  useEffect(() => {
    if (stage === "select") {
      let timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [stage]);

  const startGame = () => {
    setStage("memorize");
    setSelectedIcons([]);
    setTimeLeft(100);
    let shuffled = allIcons.sort(() => 0.5 - Math.random()).slice(0, 4 + level);
    setCorrectIcons(shuffled);
    setTimeout(() => setStage("select"), 3000);
  };

  const selectIcon = (icon) => {
    if (!selectedIcons.includes(icon)) {
      setSelectedIcons((prev) => [...prev, icon]);
    }
  };

  const checkResults = () => {
    let correct = selectedIcons.filter((icon) =>
      correctIcons.includes(icon)
    ).length;
    let newScore = score + correct * 10;
    setScore(newScore);
    let newStreak = correct === correctIcons.length ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak >= 3) {
      setLevel(level + 1);
      setShowMessage("Level Up! 🎉");
    } else {
      setShowMessage("");
    }
    alert(
      `You remembered ${correct} out of ${correctIcons.length} items!\nScore: ${newScore}\nStreak: ${newStreak}`
    );
    startGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-15 relative overflow-hidden">
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

      {/* Game Container */}
      <div className="relative z-10">
        <motion.div
          className="bg-gray-900 p-6 rounded-lg shadow-2xl text-center max-w-sm border border-gray-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold mb-4 text-yellow-400">
            🧠 Memory Challenge
          </h2>
          <p className="mb-2 text-lg font-medium text-blue-300">
            {stage === "memorize"
              ? "Memorize these items!"
              : "Select the correct items!"}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <button className="px-5 py-2 bg-gray-800 border border-gray-400 rounded-lg text-white text-sm font-semibold">
              Level: {level} 🚀
            </button>
            <button className="px-8 py-2 bg-gray-800 border border-gray-400 rounded-lg text-green-400 text-sm font-semibold">
              Score: {score} | Streak: {streak} 🔥
            </button>
          </div>

          {showMessage && (
            <motion.p
              className="text-blue-400 text-lg font-bold"
              animate={{ scale: [1, 1.2, 1] }}
            >
              {showMessage}
            </motion.p>
          )}

          {/* Timer Bar */}
          {stage === "select" && (
            <div className="w-full h-1 bg-gray-700 rounded-full mt-3">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: "100%", backgroundColor: "#1E40AF" }}
                animate={{
                  width: `${timeLeft}%`,
                  backgroundColor:
                    timeLeft <= 30
                      ? timeLeft <= 3
                        ? "#DC2626"
                        : "#F59E0B"
                      : "#1E40AF",
                }}
                transition={{ duration: 10, ease: "linear" }}
              ></motion.div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {stage === "memorize"
              ? correctIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="text-5xl p-5 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-400"
                  >
                    {icon}
                  </div>
                ))
              : allIcons.map((icon, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    className={`text-4xl p-5 rounded-lg shadow-md transition-all border border-gray-500 ${
                      selectedIcons.includes(icon)
                        ? "bg-blue-500 text-white shadow-xl"
                        : "bg-gray-300 hover:bg-blue-300"
                    }`}
                    onClick={() => selectIcon(icon)}
                  >
                    {icon}
                  </motion.button>
                ))}
          </div>

          {stage === "select" && (
            <motion.button
              onClick={checkResults}
              className="mt-4 px-5 py-2 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all"
              whileTap={{ scale: 0.9 }}
            >
              Submit ✅
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
