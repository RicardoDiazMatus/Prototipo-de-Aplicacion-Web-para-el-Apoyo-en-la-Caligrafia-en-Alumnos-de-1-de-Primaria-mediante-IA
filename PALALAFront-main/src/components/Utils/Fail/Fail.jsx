import React from "react";
import { StyledFail } from "./StyledFail";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
function Fail() {
  return (
    <StyledFail>
      <motion.div
        initial={{ y: 50, scale: 0, opacity: 0 }}

        animate={{ y: 0, scale: 1, opacity: 1 }}
      >
        <FontAwesomeIcon icon={faCircleExclamation}/>
      </motion.div>
      <motion.div
        className="fail-file-info"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <motion.p>Error al enviar al servidor. Inténtelo nuevamente más tarde.</motion.p>
      </motion.div>
    </StyledFail>
  );
}

export default Fail;
