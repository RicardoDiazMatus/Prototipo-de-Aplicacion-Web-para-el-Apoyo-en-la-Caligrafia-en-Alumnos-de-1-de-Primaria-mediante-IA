import React, { useEffect, useState } from "react";
import { StyledCommentInput } from "./CommentInput.styled";
import { AnimatePresence, motion } from "framer-motion";
import ButtonSubmit from "../../ButtonSubmit/ButtonSubmit";
import { useSelector } from "react-redux";
import { API_BASE_URL, ESCRIBIR_COMENTARIO_URL } from "../../../../utils/config";
function CommmentInput({ idFile, refreshSignalOut }) {
  const [inputTextArea, setInputTextArea] = useState("");
  const [characterLimit, setCharacterLimit] = useState(300);
  const [errors, setErrors] = useState({});
  const state = useSelector((appState) => appState);

  const fetchSendComments = async () => {
    const requestURL = `${API_BASE_URL}${ESCRIBIR_COMENTARIO_URL}`;
    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        Authorization: state.authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_archivo: idFile,
        texto: inputTextArea,
      }),
    });
    if (response.ok) {
      const responseData = await response.json();
      setInputTextArea("");
      refreshSignalOut();
    } else {
      console.log("Error sending form data: ", response.status);
      const responseData = await response.json();
      console.log("Server says: " + responseData.message);
      setErrors({error: responseData.message})
    }
  };

  const handleChange = (evt) => {
    setInputTextArea(evt.target.value);
  };

  return (
    <StyledCommentInput>
      <motion.div>
        <textarea
          maxLength={characterLimit}
          minLength={1}
          value={inputTextArea}
          rows={5}
          onChange={handleChange}
          placeholder="Escribe tu comentario..."
        ></textarea>
        <div>
          <p>
            {inputTextArea.length} / {characterLimit}
          </p>
        </div>
      </motion.div>
      <motion.div>
        <ButtonSubmit
          label={"Agregar Comentario"}
          styles={{  }}
          onClick={() => fetchSendComments()}
        />
      </motion.div>
      <AnimatePresence>
        <motion.p
          initial={{ x: 10 }}
          animate={{ x: [10, 0] }}
          style={{ color: "red", fontWeight: "bold" }}
        >
          {Object.keys(errors).map((item) => errors[item] + "\n")}
        </motion.p>
      </AnimatePresence>
    </StyledCommentInput>
  );
}

export default CommmentInput;
