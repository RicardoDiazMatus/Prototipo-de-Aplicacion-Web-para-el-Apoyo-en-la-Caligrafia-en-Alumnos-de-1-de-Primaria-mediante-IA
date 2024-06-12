import React, { useCallback, useEffect, useState } from "react";
import { StyledCarrouselTests } from "./CarrouselTests.styled";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
function CarrouselTests() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testObjects, setTestObjects] = useState([
    {
      icon: (
        <lord-icon
          src="https://cdn.lordicon.com/azyvnypg.json"
          trigger="loop"
          style={{ width: 300, height: 300 }}
        ></lord-icon>
      ),
      img: "https://picsum.photos/id/0/300/200.jpg",
      text: "Accede desde tu computadora o celular",
    },
    {
      icon: (
        <lord-icon
          src="https://cdn.lordicon.com/qavjrwxs.json"
          trigger="loop"
          style={{ width: 300, height: 300 }}
        ></lord-icon>
      ),
      img: "./assets/images/ia.svg",
      text: "Evaluado por una inteligencia artificial",
    },
    {
      icon: (
        <lord-icon
          src="https://cdn.lordicon.com/mlaiahyo.json"
          trigger="loop"
          style={{ width: 300, height: 300 }}
        ></lord-icon>
      ),
      img: "./assets/images/profesores_trabajo.svg",
      text: "Posible trabajo con profesorado",
    },
  ]);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const testsVariants = {
    initial: { scale: 0, y: 50, position: "absolute" },
    animate: { scale: 1, y: 0, transition: { duration: 0.5 } },
    exit: { scale: 0, opacity: 0, y: -50 },
  };

  const paginateTests = useCallback(
    (newDirection) => {
      currentIndex + 1 === testObjects.length
        ? setCurrentIndex(0)
        : setCurrentIndex(currentIndex + newDirection);
    },
    [setCurrentIndex, currentIndex, testObjects]
  );

  useEffect(() => {
    let interval;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, clear the interval
        clearInterval(interval);
      } else {
        // Tab is visible, restart the interval
        interval = setInterval(() => {
          paginateTests(1);
        }, 10000);
      }
    };

    // Add an event listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start the initial interval
    interval = setInterval(() => {
      paginateTests(1);
    }, 10000);
    // Clean up the interval and event listener on component unmount
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [paginateTests]);

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <StyledCarrouselTests
      ref={ref}
      variants={{
        show: { transition: { staggerChildren: 0.5, delayChildren: 1 } },
        hidden: { opacity: 1 },
      }}
      initial="hidden"
      animate={controls}
    >
      <div>
        <motion.div
          variants={{
            show: { transition: { staggerChildren: 0.1 } },
            hidden: { opacity: 1 },
          }}
          className="circle-carrousel"
        >
          <motion.div
            variants={{
              hidden: { scale: 0 },
              show: {
                scale: 1,
                rotateZ: [0, 360, 0],
                transition: { rotateZ: { repeat: Infinity, duration: 30 } },
              },
            }}
          ></motion.div>
          <motion.div
            variants={{
              hidden: { scale: 0 },
              show: {
                scale: 1,
                rotateZ: [0, 30, 0, -30, 0],
                transition: {
                  rotateZ: {
                    ease: "easeInOut",
                    repeat: Infinity,
                    duration: 30,
                  },
                },
              },
            }}
          >
            <AnimatePresence>
              {testObjects.map(
                (object, index) =>
                  currentIndex === index && (
                    <motion.div
                      key={index}
                      custom={index}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={testsVariants}
                    >
                      {object.icon}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        <div className="info-carrousel">
          <motion.div
            variants={{
              hidden: { scale: 0 },
              show: { scale: 1 },
            }}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AnimatePresence>
              {testObjects.map(
                (object, index) =>
                  currentIndex === index && (
                    <motion.img
                      src={object.img}
                      key={index}
                      custom={index}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{maxWidth: "30rem", maxHeight: "20rem"}}
                      variants={testsVariants}
                    />
                  )
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            variants={{
              hidden: { scale: 0 },
              show: { scale: 1 },
            }}
            style={{ position: "relative" }}
          >
            <AnimatePresence>
              {testObjects.map(
                (object, index) =>
                  currentIndex === index && (
                    <motion.h3
                      key={index}
                      custom={index}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={testsVariants}
                    >
                      {object.text}
                    </motion.h3>
                  )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </StyledCarrouselTests>
  );
}
export default CarrouselTests;
