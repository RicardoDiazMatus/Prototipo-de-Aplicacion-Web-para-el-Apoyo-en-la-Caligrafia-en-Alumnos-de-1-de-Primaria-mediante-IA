import React, { useEffect, useState } from "react";
import { StyledUserFileViewer } from "./UserFileViewer.styled";

import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import Comments from "./Comments/Comments";

import PDFViewer from "../PDFViewer/PDFViewer";
import { convertBlobToPDF } from "../../../utils/functions/functions";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import MenuIA from "../../IA/MenuIA/MenuIA";
import { useGetAuthPayload } from "../../../utils/hooks/hooks";
import CommmentInput from "./CommentInput/CommentInput";
import {
  API_BASE_URL,
  MUESTRA_CLASES_ALUM_URL,
  MUESTRA_DOC_URL,
  MUESTRA_RESULTADOS_URL,
  OBTENER_IMAGEN_URL,
} from "../../../utils/config";
import Loading from "../Loading/Loading";
function UserFileViewer({ idFile }) {
  const [rechargeItems, setRechargeItems] = useState(false);
  const [pdfURL, setPdfURL] = useState(null);
  const [wordURL, setWordURL] = useState(null);
  const [options, setOptions] = useState([]);
  const [isIAMenuVisible, setIAMenuVisibility] = useState(false);
  const [results, setResults] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);
  const authPayload = useGetAuthPayload();
  const state = useSelector((appState) => appState);

  const blobToDataURL = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    const fetchWordFile = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_DOC_URL}`;
        const response = await fetch(requestURL, {
          method: "POST",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_archivo: idFile,
          }),
        });
        if (response.ok) {
          const blobWord = await response.blob();
          const urlWord = window.URL.createObjectURL(blobWord);
          setWordURL(urlWord);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData.message);
        }
      } catch (error) {
        console.log("Error while sending data");
        console.log(error);
      }
    };
    fetchWordFile();
  }, []);

  useEffect(() => {
    const fetchImgFile = async () => {
      try {
        const requestURL = `${API_BASE_URL}${OBTENER_IMAGEN_URL}`;
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
          const imageBuffer = await response.arrayBuffer();
          const imageBlob = new Blob([imageBuffer]);
          const imageUrl = await URL.createObjectURL(imageBlob);
          const pdf = await convertBlobToPDF(imageBlob);
          const pdfUL = URL.createObjectURL(pdf);
          setPdfURL(pdfUL);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData.message);
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    fetchImgFile();
  }, []);

  useEffect(() => {
    const fetchStudentGroups = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_CLASES_ALUM_URL}/${authPayload.id}`;
        const response = await fetch(requestURL, {
          method: "GET",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
            //"X-Jsio-Token": "4fc7f1d12d85bc37cf4d64295cda3e6a",
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          const options = responseData.map((item) => ({
            value: item.id_grupo,
            label: item.nombre_grupo,
          }));
          setOptions(options);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData.message);
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    if (rechargeItems) {
      setRechargeItems(false);
    }
    fetchStudentGroups();
  }, [rechargeItems]);

  useEffect(() => {
    const fetchGetResultsByGroupId = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_RESULTADOS_URL}`;
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
          setResults(responseData.resultados);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData.message);
        }
      } catch (error) {
        console.log("Error while sending data: ", error);
      }
    };
    fetchGetResultsByGroupId();
  }, []);

  const handleRefreshComments = () => {
    setRefreshComments(!refreshComments);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = wordURL;
    link.download = `resultados_${idFile}.docx`; // Set the desired filename
    link.click();
  };

  const handleMenuReturnFileClic = () => {
    setIAMenuVisibility(false);
  };

  return (
    <StyledUserFileViewer>
      <motion.div className="sfv-viewer">
        {pdfURL ? (
          <PDFViewer pdfFile={pdfURL} wordFile={wordURL} idFile={idFile} />
        ) : (
          <motion.div className="sfv-viewer-loading" >
            <Loading loadingInfo={<p style={{marginBottom: "1rem"}}>Cargando tu imagen</p>} />
          </motion.div>
        )}

        <motion.div className="sfv-viewer-results">
          <MenuIA
            handleMenuReturnFileClic={handleMenuReturnFileClic}
            results={results}
          />
        </motion.div>
      </motion.div>
      <motion.div className="sfv-options">
        <Comments refreshSignalIn={refreshComments} idFile={idFile} />
        <motion.div>
          {authPayload.userType === "profesor" && (
            <CommmentInput
              idFile={idFile}
              refreshSignalOut={handleRefreshComments}
            />
          )}
          <motion.div>
            <ButtonSubmit
              label={"Resultados"}
              styles={{}}
              onClick={() => setIAMenuVisibility(true)}
            />
            <ButtonSubmit
              label={"Descargar"}
              styles={{}}
              onClick={handleDownload}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isIAMenuVisible && (
          <motion.div style={{ borderRadius: "10rem" }}>
            <MenuIA
              handleMenuReturnFileClic={handleMenuReturnFileClic}
              results={results}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </StyledUserFileViewer>
  );
}

export default UserFileViewer;
