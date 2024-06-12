import React from "react";
import { StyledUploadIA } from "./UploadIA.styled";
import { motion } from "framer-motion";
function UploadIA({ handleImageChange }) {
  return (
    <StyledUploadIA>
      <motion.label
        htmlFor="image-upload"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        <div>
          <p>Sube tu imagen</p>
        </div>
        <div>
          <svg
            width={100}
            height={100}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-file-icon"
          >
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n     .line-file1-a {animation:line-file1-draw 3s infinite; stroke-dasharray: 110;}\n     .line-file1-b {animation:line-file1-draw 3s 300ms infinite; stroke-dasharray: 110; stroke-dashoffset: 120;}\n     .line-file1-c {animation:line-file1-draw 3s 600ms infinite; stroke-dasharray: 110; stroke-dashoffset: 120;}\n     @keyframes line-file1-draw {\n         0%{stroke-dashoffset: 120;}\n         20%{stroke-dashoffset: 120;}\n         80%{stroke-dashoffset: 0;}\n         100%{stroke-dashoffset: -110;}\n     }\n     @media (prefers-reduced-motion: reduce) {\n         .line-file1-a, .line-file1-b, .line-file1-c {\n             animation: none;\n         }\n     }\n    ",
              }}
            />
            <path
              className="fill1"
              d="M14 6V94H86V30.5H61.5V6H14Z"
              fill="#fff"
              strokeWidth="2px"
              style={{ animationDuration: "3s" }}
            />
            <path
              className="fill1"
              d="M86 30.5L61.5 6V30.5H86Z"
              fill="#fff"
              strokeWidth="2px"
              style={{ animationDuration: "3s" }}
            />
            <path
              className="stroke1"
              d="M86 30.5V94H14V6H61.5M86 30.5L61.5 6M86 30.5H61.5V6"
              stroke="rgba(254,93,65,1)"
              strokeWidth="2px"
              style={{ animationDuration: "3s" }}
            />
            <line
              className="line-file1-a stroke2"
              x1="27.5"
              y1={33}
              x2="48.5"
              y2={33}
              stroke="rgba(254,93,65,1)"
              strokeWidth="2px"
              style={{ animationDuration: "3s" }}
            />
            <line
              className="line-file1-b stroke2"
              x1="27.5"
              y1={53}
              x2="71.5"
              y2={53}
              stroke="rgba(254,93,65,1)"
              strokeWidth="2px"
              style={{ animationDuration: "3s" }}
            />
            <line
              className="line-file1-c stroke2"
              x1="27.5"
              y1={73}
              x2="71.5"
              y2={73}
              stroke="rgba(254,93,65,1)"
              strokeWidth="2px"
              style={{ animationDuration: "3s" }}
            />
          </svg>
        </div>
      </motion.label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </StyledUploadIA>
  );
}

export default UploadIA;
