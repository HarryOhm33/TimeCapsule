import React, { useEffect, useState } from "react";

const Spinner = () => {
  const totalDots = 18;
  const [visibleDots, setVisibleDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleDots((prev) => (prev < totalDots ? prev + 1 : 0));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.spinner}>
          {[...Array(totalDots)].map((_, i) => {
            const size = 4 + (i / totalDots) * 6;
            const opacity = (i + 1) / totalDots;
            const brightness = 50 + (i / totalDots) * 50;
            return (
              <div
                key={i}
                style={{
                  ...styles.dot,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: i < visibleDots ? opacity * 0.7 : 0,
                  filter: `brightness(${brightness}%) drop-shadow(0 0 4px cyan)`,
                  transform: `translate(-50%, 50%) rotate(${
                    i * (360 / totalDots)
                  }deg) translateY(28px)`,
                }}
              />
            );
          })}
        </div>
        <p style={styles.loadingText}>Please Wait!</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Slight transparency
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999, // Ensures it's on top
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    position: "relative",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    position: "absolute",
    backgroundColor: "cyan",
    borderRadius: "50%",
    transition: "opacity 0.1s ease-in-out",
  },
  loadingText: {
    color: "cyan",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
    textShadow: "0 0 4px cyan",
    opacity: 0.8,
  },
};

export default Spinner;
