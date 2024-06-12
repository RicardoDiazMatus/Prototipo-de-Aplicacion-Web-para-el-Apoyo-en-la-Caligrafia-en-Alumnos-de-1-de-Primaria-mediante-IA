import React, { useEffect, useState } from "react";
import { StyledMenuIA } from "./MenuIA.styled";
import ButtonSubmit from "../../Utils/ButtonSubmit/ButtonSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUp,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Loading from "../../Utils/Loading/Loading";
import NoData from "../../Utils/NoData/NoData";
function MenuIA({ handleMenuReturnFileClic, results, globalResult }) {
  const [assessmentResult, setAssessmentResults] = useState(null);

  console.log(globalResult);
  useEffect(() => {
    setAssessmentResults(results);
  }, [results]);
  return (
    <StyledMenuIA
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="menu-ia-results">
        {assessmentResult === null ? (
          <motion.div style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>
            <Loading
              loadingInfo={"Cargando tus resultados"}
              iconheight="15rem"
            />
          </motion.div>
        ) : assessmentResult.length === 0 ? (
          <motion.div style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>
            <NoData
              label={<motion.p >No se cargaron tus datos</motion.p>}
              height="100%"
              widthimg="10rem"
            />
          </motion.div>
        ) : (
          <>
            {assessmentResult.map((result, index) => (
              <div key={index} className="menu-ia-result">
                <h4>
                  {result.prediccionCorrecta!==null ? (
                    <>
                      {result.etiqueta}
                      {result.prediccionCorrecta ? (
                        <span>(✓)</span>
                      ) : (
                        <span>(✕)</span>
                      )}{" "}
                      : <span>{result.calificacion}</span>
                    </>
                  ) : (
                    <>{result.etiqueta} : Error en detección</>
                  )}
                </h4>
              </div>
            ))}
            <div className="menu-ia-result">
                <h4>
                  {
                    <>Calificación : {globalResult}</>
                  }
                </h4>
              </div>
          </>
        )}
      </div>
      <div className="menu-ia-buttons no-desktop-768">
        <ButtonSubmit
          label={
            <>
              <FontAwesomeIcon icon={faArrowUp} /> Regresar{" "}
            </>
          }
          styles={{
            backgroundColor: "#ffbe0a",
            hoverBackgroundColor: "#E0A600",
            border: "#ffffff solid 0.2rem",
            borderRadius: "20rem",
            width: "10rem",
          }}
          onClick={handleMenuReturnFileClic}
        />
      </div>
    </StyledMenuIA>
  );
}

export default MenuIA;
