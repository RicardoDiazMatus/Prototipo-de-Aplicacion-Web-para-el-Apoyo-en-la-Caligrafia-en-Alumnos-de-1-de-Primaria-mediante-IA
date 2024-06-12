import React, { useEffect, useState } from "react";
import { StyledComments } from "./Comments.styled";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { API_BASE_URL, MUESTRA_COMENTARIOS_URL } from "../../../../utils/config";
function Comments({ refreshSignalIn, idFile }) {
  const [comments, setComments] = useState(null);
  const state = useSelector((appState) => appState);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_COMENTARIOS_URL}`;
        const response = await fetch(requestURL, {
          method: "POST",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
            //"X-Jsio-Token": "4fc7f1d12d85bc37cf4d64295cda3e6a",
          },
          body: JSON.stringify({
            id_archivo: idFile,
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          setComments(responseData);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData.message);
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    fetchComments();
  }, [refreshSignalIn]);

  return (
    <StyledComments>
      <h4>Comentarios</h4>
      <AnimatePresence>
        <motion.div
          className="sfv-comments-displayer"
          style={{ justifyContent: comments ? "flex-start" : "center" }}
        >
          {comments !== null ? (
            comments.length === 0 ? (
              <motion.p
                style={{
                  color: "#ccc",
                  alignSelf: "center",
                  margin: "auto auto",
                  fontSize: "2rem",
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                No hay ningún comentario
              </motion.p>
            ) : (
              comments.map((comment, index) => (
                <motion.p
                  key={index}
                  className="comment"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  {comment.comentario} - {comment.profesor}
                </motion.p>
              ))
            )
          ) : (
            <motion.p
              style={{
                color: "#ccc",
                alignSelf: "center",
                fontSize: "2rem",
                textAlign: "center",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: [1, 0.8, 1], transition: {
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              } }}
              
            >
              {" "}
              Cargando Comentarios{" "}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </StyledComments>
  );
}

export default Comments;
