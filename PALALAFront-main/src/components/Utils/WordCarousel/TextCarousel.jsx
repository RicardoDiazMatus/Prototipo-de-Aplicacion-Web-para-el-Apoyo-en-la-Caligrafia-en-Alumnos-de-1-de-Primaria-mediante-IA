import React, { useState, useEffect, useCallback } from "react";
import { StyledTextCarousel } from "./TextCarousel.styled";
import { AnimatePresence, motion } from "framer-motion";

function TextCarousel({ words, color, direction, delay }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const wordVariantsHorizontal = {
    initial: { x: "-100%", y: "0%", opacity: 0 },
    animate: { x: "0%", y: "0%", opacity: 1 },
    exit: { x: "100%", y: "0%", opacity: 0 },
  };

  const wordVariantsVertical = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  };

  const paginateWord = useCallback(
    (newDirection) => {
      currentIndex + 1 === words.length
        ? setCurrentIndex(0)
        : setCurrentIndex(currentIndex + newDirection);
    },
    [setCurrentIndex, currentIndex, words]
  );

  // Rotate to the next word at a specified interval (e.g., every 3 seconds)
  /* useEffect(() => {
    const interval = setInterval(
      () => {
        paginateWord(1);
      },
      delay ? delay : 3000
    );
    // Change word every 3 seconds
    return () => clearInterval(interval);
  }, [paginateWord, currentIndex, delay]);
*/

  useEffect(() => {
    let interval;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, clear the interval
        clearInterval(interval);
      } else {
        // Tab is visible, restart the interval
        interval = setInterval(() => {
          paginateWord(1);
        }, delay || 3000);
      }
    };

    // Add an event listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start the initial interval
    interval = setInterval(() => {
      paginateWord(1);
    }, delay || 3000);
    // Clean up the interval and event listener on component unmount
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [paginateWord, delay]);

  return (
    <StyledTextCarousel color={color}>
      <AnimatePresence initial={false}>
        {words.map(
          (word, index) =>
            currentIndex === index && (
              <motion.div
                key={index}
                custom={index}
                variants={
                  direction === "vertical"
                    ? wordVariantsVertical
                    : wordVariantsHorizontal
                }
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {word}
              </motion.div>
            )
        )}
      </AnimatePresence>
    </StyledTextCarousel>
  );
}

export default TextCarousel;
