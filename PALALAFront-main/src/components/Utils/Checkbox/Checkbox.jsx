import React, { useState } from "react";
import { StyledCheckbox } from "./Checkbox.styled";

function Checkbox({ label, color, name, func }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <StyledCheckbox>
      <label>
        <div className="checkbox-container">
          <input
            name={name}
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(!isChecked);
              func(e);
            }
            }
          />
        </div>
        <span>{label}</span>
      </label>
    </StyledCheckbox>
  );
}

export default Checkbox;
