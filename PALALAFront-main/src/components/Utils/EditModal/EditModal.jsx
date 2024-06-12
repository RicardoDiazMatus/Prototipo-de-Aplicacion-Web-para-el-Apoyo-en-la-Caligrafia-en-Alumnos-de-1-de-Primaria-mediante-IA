import React from "react";
import { StyledEditModal } from "./EditModal.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import { motion } from "framer-motion";
function EditModal({ children, handleCancel, handleOperation}) {
  return (
    <StyledEditModal>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <FontAwesomeIcon icon={faPencil} />
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ButtonSubmit label={"Cancelar"} onClick={handleCancel} />
        <ButtonSubmit label={"Aceptar"} onClick={handleOperation} />
      </motion.div>
    </StyledEditModal>
  );
}

export default EditModal;
