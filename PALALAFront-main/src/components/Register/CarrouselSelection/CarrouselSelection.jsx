import React, { useCallback, useState } from "react";
import { StyledCarrouselSelection } from "./CarrouselSelection.styled";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function CarrouselSelection(props) {
  const { updateUserValue } = props
  const [[page, direction], setPage] = useState([0, 0]);
  const images = [
    "../assets/images/dibujos_nina_alegre.svg",
    "../assets/images/maestro.svg",
  ];

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
  updateUserValue(imageIndex);
  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection]);
      updateUserValue(imageIndex);
    },
    [setPage, page]
  );

  return (
    <StyledCarrouselSelection>
      
      <AnimatePresence
        initial={false}
        custom={direction}
        className="container-carousel"
      >
        <motion.img
          className="carousel-img"
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
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
        />
      </AnimatePresence>
      <div className="prev" onClick={() => paginate(1)}>
        <FontAwesomeIcon icon={faChevronLeft}/>
      </div>
      <div className="next" onClick={() => {paginate(-1)}}>
        <FontAwesomeIcon icon={faChevronRight}/>
      </div>
    </StyledCarrouselSelection>
  );
}

export default CarrouselSelection;
