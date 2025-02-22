import React, { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const [dots, setDots] = useState(Array(12).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) =>
        prev.map((_, index) =>
          index === prev.length - 1 ? 0 : prev[index] + 1
        )
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.spinner}>
        {dots.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.dot,
              transform: `rotate(${index * 30}deg) translateY(-40px)`,
              opacity: (index + 1) / dots.length,
            }}
          />
        ))}
      </div>
      <p style={styles.loadingText}>FETCHING</p>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000",
  },
  spinner: {
    position: "relative",
    width: "80px",
    height: "80px",
    animation: "spin 1.5s linear infinite", // ✅ Rotation animation
  },
  dot: {
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "cyan",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transition: "opacity 0.2s ease-in-out",
  },
  loadingText: {
    color: "cyan",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
  },
};

// ✅ Add global keyframes for spinning
const styleSheet = document.styleSheets[0];
const keyframes = `@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default LoadingSpinner;
