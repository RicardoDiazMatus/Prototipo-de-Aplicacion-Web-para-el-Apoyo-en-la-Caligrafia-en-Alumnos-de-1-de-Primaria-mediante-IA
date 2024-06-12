import React from "react";
import { StyledErrorModal } from "./ErrorModal.styled";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
function ErrorModal({errText, handleReturn}) {
  return (
    <StyledErrorModal>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3>Error en la Operación</h3>
        <p>{errText}</p>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ButtonSubmit label={"Regresar"} onClick={handleReturn} />
      </motion.div>
    </StyledErrorModal>
  );
}

export default ErrorModal;
