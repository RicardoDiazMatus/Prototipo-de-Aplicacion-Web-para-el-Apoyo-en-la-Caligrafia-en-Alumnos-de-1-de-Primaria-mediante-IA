import React, { useState } from "react";
import { StyledNavigationCarousel } from "./NavigationCarousel.styled";
import { AnimatePresence, motion } from "framer-motion";

function NavigationCarousel({ elements, headerspace }) {
  const [activeElement, setActiveElement] = useState(0);

  const handleClickOnHeader = (index) => {
    setActiveElement(index);
  };

  return (
    <StyledNavigationCarousel headerspace={headerspace}>
      <div className="navigation-carousel-header">
        {elements.map((element, index) => (
          <div
            key={index}
            className={index === activeElement ? "header-select" : ""}
            onClick={() => handleClickOnHeader(index)}
          >
            <h4>{element.headerElement}</h4>
          </div>
        ))}
      </div>

      
      
      <div className="navigation-carousel-body">
        <AnimatePresence>
          {elements.map(
            (element, index) =>
              activeElement === index && (
                <motion.div
                  className="navigation-carousel-body-element"
                  key={index}
                  initial={{ opacity: 0, y: 50, x: 0, scale: 0, position: "absolute" }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: {delay: 0.4}, position: "static"  }}
                  exit={{ opacity: 0, y:50, scale: 0, position: "absolute" }}
                >
                  {element.bodyElement}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
      
    </StyledNavigationCarousel>
  );
}

export default NavigationCarousel;
