import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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

  useEffect(() => startGame(), [level]);
  useEffect(() => {
    if (stage === "select") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [stage]);

  const startGame = () => {
    setStage("memorize");
    setSelectedIcons([]);
    setTimeLeft(100);
    let shuffled = allIcons.sort(() => 0.5 - Math.random()).slice(0, 4 + level); // Increase icons with level
    setCorrectIcons(shuffled);
    setTimeout(() => setStage("select"), 3000);
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setLevel(1);
    startGame();
  };

  const selectIcon = (icon) => {
    // Prevent selecting more icons than the number of correctIcons
    if (
      selectedIcons.length >= correctIcons.length &&
      !selectedIcons.includes(icon)
    ) {
      toast.error(`You can only select ${correctIcons.length} items!`);
      return;
    }

    // Toggle selection: unselect if already selected
    if (selectedIcons.includes(icon)) {
      setSelectedIcons((prev) => prev.filter((i) => i !== icon));
    } else {
      setSelectedIcons((prev) => [...prev, icon]);
    }
  };

  const checkResults = () => {
    // Ensure the user has selected the correct number of icons
    if (selectedIcons.length !== correctIcons.length) {
      toast.error(`Please select exactly ${correctIcons.length} items!`);
      return;
    }

    // Calculate correct answers
    let correct = selectedIcons.filter((icon) =>
      correctIcons.includes(icon)
    ).length;
    let newScore = score + correct * 10;
    let newStreak = correct === correctIcons.length ? streak + 1 : 0;

    // Update state
    setScore(newScore);
    setStreak(newStreak);

    // Check for level up
    if (newStreak >= 3) {
      setLevel((prevLevel) => prevLevel + 1);
      setShowMessage("Level Up! 🎉");
    } else {
      setShowMessage("");
    }

    // Show feedback
    if (correct === correctIcons.length) {
      toast.success("🎉 Correct! You earned 100 points!");
    } else {
      toast.error(
        `😢 Incorrect! You got ${correct} out of ${correctIcons.length} correct.`
      );
    }

    // Delay before starting the next round
    setTimeout(() => {
      startGame();
    }, 1500); // 1.5 seconds delay
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
        className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-lg shadow-2xl text-center max-w-sm border border-gray-700/50 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold mb-4 text-yellow-400">
          🧠 Memory Challenge
        </h2>
        <p className="mb-2 text-lg font-medium text-blue-300">
          {stage === "memorize"
            ? "Memorize these items!"
            : `Select ${correctIcons.length} items!`}
        </p>

        {/* Level and Score */}
        <div className="flex items-center gap-2 mb-3">
          <button className="px-5 py-2 bg-gray-800 border border-gray-400 rounded-lg text-white text-sm font-semibold">
            Level: {level} 🚀
          </button>
          <button className="px-8 py-2 bg-gray-800 border border-gray-400 rounded-lg text-green-400 text-sm font-semibold">
            Score: {score} | Streak: {streak} 🔥
          </button>
        </div>

        {/* Level Up Message */}
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
          <div className="w-full h-0.5 bg-gray-700 rounded-full mt-3">
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${timeLeft}%` }}
              animate={{
                backgroundColor:
                  timeLeft <= 50
                    ? timeLeft <= 30
                      ? "#DC2626"
                      : "#F59E0B"
                    : "#1E40AF",
              }}
              transition={{ ease: "linear" }}
            ></motion.div>
          </div>
        )}

        {/* Icons Grid */}
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

        {/* Submit and Reset Buttons */}
        {stage === "select" && (
          <div className="flex gap-3 mt-4 justify-center">
            <motion.button
              onClick={checkResults}
              className="px-5 py-2 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all"
              whileTap={{ scale: 0.9 }}
            >
              Submit ✅
            </motion.button>
            <motion.button
              onClick={resetGame}
              className="px-5 py-2 bg-red-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-600 transition-all"
              whileTap={{ scale: 0.9 }}
            >
              Reset 🔄
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
