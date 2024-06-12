import React from "react";
import { StyledUpload } from "./Upload.styled";
import { Link } from "react-router-dom";

function Upload() {
  return (
    <StyledUpload>
      <Link to={"/IA"}>
      <label htmlFor="image-upload">
        <div>
          <p>Sube tu archivo</p>
        </div>
        <div>
          <p>¡Súbelo!</p>
        </div>
      </label>
      <input id="image-upload" type="file" accept="image/*" />
      </Link>
    </StyledUpload>
  );
}
export default Upload;
