import React, { useEffect } from "react";
import { StyledOverlayModal } from "./OverlayModal.styled";
import { motion } from "framer-motion";
function OverlayModal({ children, handleClose, topposition }) {


  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Cleanup effect to re-enable the scroll bar when the modal is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <StyledOverlayModal
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      topposition={topposition}
    >
      <motion.div
        //initial={{ bottom: 0, width: 0, height: 0, borderRadius: "100%"}}
        initial={{scale: 0, borderRadius: "100%"}}
        //animate={{bottom: "25%", width: "auto", height: "auto", borderRadius: "1rem"}}
        animate={{scale: 1}}
        className="modal"
        transition={{duration: 0.3}}
      >
      {children}
      </motion.div>
      <div className="exit-button" onClick={handleClose}>
        <h3>X</h3>
      </div>
    </StyledOverlayModal>
  );
}

export default OverlayModal;
