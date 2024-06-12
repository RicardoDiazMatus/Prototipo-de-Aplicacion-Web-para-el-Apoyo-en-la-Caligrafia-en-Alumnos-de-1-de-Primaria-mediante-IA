import React, { useCallback, useEffect, useState } from "react";
import { StyledStudentMenuSlider } from "./StudentMenuSlider.styled";
import { AnimatePresence, motion, wrap } from "framer-motion";
import CardNavigation from "../CardNavigation/CardNavigation";

function StudentMenuSlider({ isSlidable }) {
  const [[page, direction], setPage] = useState([0, 0]);

  const cardsNavigation = [
    <CardNavigation
      label={"IA PALALA"}
      imgRoute={"https://picsum.photos/id/237/300/300"}
      backgroundColor={"#FFE0DB"}
      imgBackgroundColor={"#FE5D41"}
    />,
    <CardNavigation
      label={"Mis Archivos"}
      imgRoute={"https://picsum.photos/id/237/300/300"}
      backgroundColor={"#EEEAFF"}
      imgBackgroundColor={"#917BFF"}
    />,
    <CardNavigation
      label={"Configuración"}
      imgRoute={"https://picsum.photos/id/237/300/300"}
      backgroundColor={"#E7F7D3"}
      imgBackgroundColor={"#A3EC49"}
    />,
    <CardNavigation
      label={"Mi Progreso"}
      imgRoute={"https://picsum.photos/id/237/300/300"}
      backgroundColor={"#FFF8EA"}
      imgBackgroundColor={"#FFBE0A"}
    />,
  ];
  const images = ["Lola", "La Trailer", "Se divierte"];

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const imageIndex = wrap(0, images.length, page);
  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection]);
    },
    [setPage, page]
  );

  /*
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    // Change word every 3 seconds
    return () => clearInterval(interval);
  }, [paginate, page]);
*/

console.log("Page: " + page);
  return (
    <StyledStudentMenuSlider>
      <AnimatePresence
        initial={false}
        custom={direction}
        className="container-carousel"
      >
        <motion.div
          className="menu-student-slidershow"
          key={page}
          custom={direction}
          variants={variants}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          draggable={true}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          {cardsNavigation.map((cards) => {
            return (
            <motion.div
              className="div-container"
            >
              {cards}
            </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
      {isSlidable ? (
        <div>
          <div className="next" onClick={() => paginate(1)}>
            {"‣"}
          </div>
          <div className="prev" onClick={() => paginate(-1)}>
            {"‣"}
          </div>
        </div>
      ) : null}
    </StyledStudentMenuSlider>
  );
}

export default StudentMenuSlider;
