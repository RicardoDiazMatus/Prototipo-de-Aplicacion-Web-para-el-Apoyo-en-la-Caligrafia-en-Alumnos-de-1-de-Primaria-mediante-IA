import React, { useEffect } from "react";
import { StyledLetterAnimation } from "./LetterAnimation.styled";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
function LetterAnimation() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const visibleVariants = {
    show: { scale: 1, transition: { duration: 1, staggerChildren: 0.8 }},
    hidden: { scale: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <StyledLetterAnimation ref={ref}>
      <div className="letter-line-animation"></div>
      <motion.div
        variants={visibleVariants}
        initial="hidden"
        animate={controls}
        className="letters-container"
      >
        <motion.div
          animate={{ rotateZ: -25, transition: { delay: 1, rotateZ: { duration: 1 } } }}
          variants={visibleVariants}
        >
          PA
        </motion.div>
        <motion.div
          animate={{ rotateZ: 25, transition: { delay: 1, rotateZ: { duration: 1 } } }}
          variants={visibleVariants}
        >
          LA
        </motion.div>
        <motion.div
          animate={{ rotateZ: -25, transition: { delay: 1, rotateZ: { duration: 1 } } }}
          variants={visibleVariants}
        >
          LA
        </motion.div>
      </motion.div>
    </StyledLetterAnimation>
  );
}

export default LetterAnimation;
