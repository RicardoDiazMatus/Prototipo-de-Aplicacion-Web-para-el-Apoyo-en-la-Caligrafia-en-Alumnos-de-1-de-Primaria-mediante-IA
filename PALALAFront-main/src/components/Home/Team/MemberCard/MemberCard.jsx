import React, { useEffect } from "react";
import { StyledMemberCard } from "./MemberCard.styled";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
function MemberCard({ name, desc, isStudent, isMen }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <StyledMemberCard
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.3 } },
        exit: { opacity: 0 },
      }}
      initial="hidden"
      animate={controls}
      exit="hidden"
    >
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            scale: 0,
            rotateY: 0,
            y: 50,
            transition: { rotateY: { duration: 1 } },
          },
          show: {
            opacity: 1,
            scale: 1,
            rotateY: 360,
            y: 0,
            transition: { rotateY: { duration: 1 } },
          },
        }}
        className="member-card-image"
      >
        {isStudent ? (
          <lord-icon
            src="https://cdn.lordicon.com/uaetnrqo.json"
            trigger="loop"
            delay="3000"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
        ) : isMen ? (
          <lord-icon
            src="https://cdn.lordicon.com/zfmcashd.json"
            trigger="loop"
            delay="3000"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
        ) : (
          <lord-icon
            src="https://cdn.lordicon.com/zbblnakr.json"
            trigger="loop"
            delay="3000"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
        )}
      </motion.div>
      <motion.div className="member-card-info">
        <motion.h3
          variants={{
            hidden: { opacity: 0, scale: 0, rotateY: 0, y: 50 },
            show: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 1 },
            },
          }}
        >
          {name}
        </motion.h3>
        <motion.p
          variants={{
            hidden: { opacity: 0, scale: 0, rotateY: 0, y: 50 },
            show: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 1 },
            },
          }}
        >
          {desc}
        </motion.p>
      </motion.div>
    </StyledMemberCard>
  );
}

export default MemberCard;
