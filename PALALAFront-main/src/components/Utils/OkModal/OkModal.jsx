import React from "react";
import { StyledOkModal } from "./OkModal.styled";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
function OkModal({ handleNext }) {
  return (
    <StyledOkModal>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <FontAwesomeIcon icon={faThumbsUp} />
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3>Operación Correcta</h3>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ButtonSubmit label={"Siguiente"} onClick={handleNext} />
      </motion.div>
    </StyledOkModal>
  );
}

export default OkModal;
