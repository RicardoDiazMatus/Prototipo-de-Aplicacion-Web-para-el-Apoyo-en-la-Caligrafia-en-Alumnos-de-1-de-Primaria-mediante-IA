import React from "react";
import { StyledCardNavigation } from "./CardNavigation.styled";
import { Link } from "react-router-dom";

function CardNavigation({
  label,
  img,
  backgroundColor,
  imgBackgroundColor,
}) {
  return (
    <StyledCardNavigation
      whileHover={{ scale: [1, 1.1, 1], transition: {ease: "linear", duration: 0.9, repeat: Infinity, repeatDelay: 0.2}}}
      whileTap={{ scale: 0.9 }}
      backgroundcolor={backgroundColor}
      imgbackgroundcolor={imgBackgroundColor}
    >
      <div className="card-navigation-link">
        <div>
          {img}
        </div>
        <div>
          <h3>{label}</h3>
        </div>
      </div>
    </StyledCardNavigation>
  );
}

export default CardNavigation;
