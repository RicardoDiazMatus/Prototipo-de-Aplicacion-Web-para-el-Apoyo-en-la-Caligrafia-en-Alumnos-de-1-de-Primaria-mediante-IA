import React from "react";
import { StyledLetterCardDisplay } from "./LetterCardDisplay.styled";
import {motion} from "framer-motion"
function LetterCardDisplay({ letter, onClickHandle }) {
  return (
    <StyledLetterCardDisplay
      initial={{ scale: 0, rotateZ: 0 }}
      animate={{ scale: 1, rotateZ: 360 * 2, transition:{
        duration: 1,
      } }}
      exit={{scale: 0, rotateZ: 0}}
      onClick={() => onClickHandle()}
      whileHover={{scale: 1.2}}
    >
      <div>
        <div>
          <lord-icon
            src="https://cdn.lordicon.com/pzibcpvz.json"
            class="clipboard-svg-icon"
            trigger="loop"
            delay="2000"
          ></lord-icon>
        </div>
        <motion.h1
          initial={{rotateZ: 0}}
          animate={{rotateZ: 360}}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 1.9
          }}
        >{letter}</motion.h1>
      </div>
      <div>
        <h3>Ver Vídeo</h3>
      </div>
    </StyledLetterCardDisplay>
  );
}

export default LetterCardDisplay;
