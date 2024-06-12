import React from "react";
import { StyledButtonSubmit } from "./ButtonSubmit.styled";
//onClick is a function with args
/*Style: {
    backgroundColor
    width
    height
    fontSize
    fontWeight
    color
}
*/
function ButtonSubmit({ label, onClick, styles }) {
  return (
    <StyledButtonSubmit
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      styles={styles == undefined ? null : styles}
    >
      {label}
    </StyledButtonSubmit>
  );
}

export default ButtonSubmit;
