import React, { useState } from "react";
import { StyledBubble } from "./Bubble.styled";
import { motion, useAnimation } from "framer-motion";
function Bubble({ label, icon }) {
  const controls = useAnimation();

  return (
    <StyledBubble whileHover={{ scale: 1.2, rotateZ: 360 }}>
      <motion.div className="icon-ball">{icon}</motion.div>
      <motion.h4>{label}</motion.h4>
    </StyledBubble>
  );
}

export default Bubble;
