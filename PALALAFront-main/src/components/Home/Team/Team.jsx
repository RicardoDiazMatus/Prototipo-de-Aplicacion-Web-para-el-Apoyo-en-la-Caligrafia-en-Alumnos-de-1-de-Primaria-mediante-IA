import React, { useCallback, useEffect, useState } from "react";
import { StyledTeam } from "./Team.styled";
import MemberCard from "./MemberCard/MemberCard";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, useAnimation } from "framer-motion";
import { motion } from "framer-motion";
function Team() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [currentView, setCurrentView] = useState(0);
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const paginateView = useCallback(
    (newDirection) => {
      currentView + 1 === 2
        ? setCurrentView(0)
        : setCurrentView(currentView + newDirection);
    },
    [setCurrentView, currentView]
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
          paginateView(1);
        }, 5000);
      }
    };

    // Add an event listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start the initial interval
    interval = setInterval(() => {
      paginateView(1);
    }, 5000);
    // Clean up the interval and event listener on component unmount
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [paginateView]);

  return (
    <StyledTeam>
      <motion.h1
        ref={ref}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          show: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={controls}
      >
        Miembros
      </motion.h1>
      <motion.div className="team-members">
        <AnimatePresence>
          {currentView === 0 && (
            <motion.div className="student-members members-container">
              <motion.h2
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  show: { opacity: 1, scale: 1 },
                }}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                Alumnos
              </motion.h2>
              <motion.div className="members">
                <MemberCard
                  name="Díaz Matus Ricardo"
                  desc="Miembro del Equipo de Desarrollo"
                  isStudent={true}
                  isMen={true}
                />
                <MemberCard
                  name="López Gracia Angel Emmanuel"
                  desc="Miembro del Equipo de Desarrollo"
                  isStudent={true}
                  isMen={true}
                />
                <MemberCard
                  name="González Morelos César Emiliano"
                  desc="Miembro del Equipo de Desarrollo"
                  isStudent={true}
                  isMen={true}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {currentView === 1 && (
            <motion.div className="principal-members members-container">
              <motion.h2
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  show: { opacity: 1, scale: 1 },
                }}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                Directores
              </motion.h2>
              <motion.div className="members">
                <MemberCard
                  name="M. en C. Verónica Agustín Domínguez"
                  desc=""
                  isStudent={false}
                  isMen={false}
                />
                <MemberCard
                  name="M. en C. Ariel López Rojas"
                  desc=""
                  isStudent={false}
                  isMen={true}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </StyledTeam>
  );
}

export default Team;
