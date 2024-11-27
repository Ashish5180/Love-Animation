import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const App = () => {
  const images = [
    { src: "/IMG1.jpg", caption: "Your Smile is My Sunshine! ☀️" },
    { src: "/IMG2.jpg", caption: "You Make My Heart Skip a Beat! 💓" },
    { src: "/IMG3.jpg", caption: "The World is Better with You! 🌎" },
  ];

  const quotes = [
    "Every moment with you is like a beautiful dream.",
    "You’re the one who makes my heart smile.",
    "Love is not just what I feel, it’s what I live with you.",
    "You’re my favorite place to go when my mind searches for peace.",
    "My love for you is a journey, starting at forever and ending at never.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 5000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  const handleCreateBubble = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const newBubble = { id: Date.now(), x, y };
    setBubbles((prev) => [...prev, newBubble]);
    setTimeout(() => {
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== newBubble.id));
    }, 1200);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden"
      onClick={handleCreateBubble}
    >
      {/* Glowing Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bg-white rounded-full shadow-lg"
          style={{
            top: bubble.y,
            left: bubble.x,
            width: "20px",
            height: "20px",
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Falling Hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-400 text-xl md:text-3xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <FaHeart />
        </motion.div>
      ))}

      {/* Header */}
      <div className="absolute top-10 w-full text-center">
        <motion.h1
          className="text-white text-3xl md:text-5xl font-extrabold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          You Light Up My World! ✨
        </motion.h1>
      </div>

      {/* Quote Section */}
      <motion.div
        className="absolute top-24 w-full px-4 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.p
          key={currentQuote}
          className="text-white text-lg md:text-2xl font-medium italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {quotes[currentQuote]}
        </motion.p>
      </motion.div>

      {/* Image Slider */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6 mt-16">
        <div className="relative w-72 h-72 md:w-96 md:h-96 bg-white rounded-full shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt="Special Moment"
              className="w-full h-full object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>

        {/* Caption */}
        <motion.h1
          key={currentIndex}
          className="text-white text-xl md:text-2xl font-semibold text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {images[currentIndex].caption}
        </motion.h1>
      </div>

      {/* Floating Thumbnails */}
      <div className="absolute bottom-16 w-full px-4 flex justify-center gap-3 md:gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${
              currentIndex === index ? "border-yellow-300" : "border-white"
            } overflow-hidden shadow-md cursor-pointer`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.1 }}
          >
            <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 bg-white/10 backdrop-blur-md text-center">
        <p className="text-white text-sm md:text-base font-light">
          Made with ❤️ to brighten your day.
        </p>
      </footer>
    </div>
  );
};

export default App;
