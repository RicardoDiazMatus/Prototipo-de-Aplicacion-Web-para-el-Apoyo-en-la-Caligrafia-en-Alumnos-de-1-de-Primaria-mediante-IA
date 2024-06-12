import React from "react";
import { StyledDeleteModal } from "./DeleteModal.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import { motion } from "framer-motion";
function DeleteModal({ handleCancel, handleOperation }) {
  return (
    <StyledDeleteModal>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <FontAwesomeIcon icon={faX} />
        </div>
      </motion.div>
      <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4 }}>
        <h3>¿Seguro que deseas continuar con la operación?</h3>
      </motion.div>
      <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}>
        <ButtonSubmit label={"Cancelar"} onClick={handleCancel} />
        <ButtonSubmit label={"Aceptar"} onClick={handleOperation} />
      </motion.div>
    </StyledDeleteModal>
  );
}

export default DeleteModal;
