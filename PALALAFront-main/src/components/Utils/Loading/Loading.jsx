import React from "react";
import { StyledLoading } from "./Loading.styled";
import { motion } from "framer-motion";
function Loading({ loadingInfo, backgroundcolor="#ffbeb3", firstcolor = "#fe5d41", secondcolor = "#ffbe0a", iconwidth = "20rem", iconheight = "20rem" }) {
    
  return (
    <StyledLoading
    initial={{scale: 0}}
    animate={{scale: 1}}
    exit={{scale: 0}}
    backgroundcolor={backgroundcolor}
    firstcolor={firstcolor}
    iconwidth={iconwidth}
    iconheight={iconheight}
    >
      <motion.div
        initial={{ y: 50, scale: 0, opacity: 0 }}
        transition={{
          y: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        }}
        animate={{ y: [0, -30, 0], scale: 1, opacity: 1 }}
      >
        <lord-icon
          src="https://cdn.lordicon.com/gwxsygdo.json"
          class="loading-lord-icon"
          trigger="loop"
          colors={`primary:${firstcolor},secondary:${
            secondcolor
          }`}
          style={{}}
        />
      </motion.div>
      <motion.div
        className="loading-file-info"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        {loadingInfo}
      </motion.div>
    </StyledLoading>
  );
}

export default Loading;
