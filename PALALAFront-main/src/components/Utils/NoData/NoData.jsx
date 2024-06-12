import React from "react";
import { motion } from "framer-motion";
import { StyledNoData } from "./NoData.styled";
function NoData({ label, widthimg = "20rem", height = "30rem" }) {
  return (
    <StyledNoData
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      widthimg={widthimg}
      height={height}
    >
      <div>
        <img
          src="../assets/images/dibujos_lapiz_llorando.svg"
          style={{ maxWidth: "60%", maxHeight: "90%" }}
        ></img>
      </div>
      <h3>{label}</h3>
    </StyledNoData>
  );
}

export default NoData;
