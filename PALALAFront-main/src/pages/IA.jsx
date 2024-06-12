import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import MenuIA from "../components/IA/MenuIA/MenuIA";
import { AnimatePresence } from "framer-motion";
import UploadIA from "../components/IA/UploadIA/UploadIA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faFloppyDisk,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import TextCarousel from "../components/Utils/WordCarousel/TextCarousel";
import PDFViewer from "../components/Utils/PDFViewer/PDFViewer";
import ButtonSubmit from "../components/Utils/ButtonSubmit/ButtonSubmit";
import ImageCropper from "../components/IA/Cropper/ImageCropper";
import { useGetAuthPayload } from "../utils/hooks/hooks";
import OverlayModal from "../components/Utils/OverlayModal/OverlayModal";
import SaveModal from "../components/IA/SaveModal/SaveModal";
import jsPDF from "jspdf";
import { API_BASE_URL, SEND_IA_URL } from "../utils/config";
import Fail from "../components/Utils/Fail/Fail";
const StyledIA = styled.div`
  width: 100%;
  display: flex;
  min-height: calc(100vh - 6.3rem);
  flex-grow: 1;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  .header-ia {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    font-size: 2.4rem;
    > div:first-child {
      flex-basis: 70%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      p {
        font-size: 1.4rem;
      }
    }
  }
  .upload-ia {
    width: 90%;
  }

  .cropper-ia {
    width: 100%;
    height: 80%;
    display: flex;
  }
  .loading-file {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffbeb3;
    border-radius: 3rem;
    width: 90%;
    height: 100%;
    .loading-lord-icon {
      width: 20rem;
      height: 20rem;
    }
    .loading-file-info {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      font-weight: bold;
      color: #fe5d41;
    }
  }

  .result-viewer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    width: 90%;

    .result-viewer-buttons {
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }

  @media (min-width: 768px) {
    height: 87rem;
    .result-viewer {
      width: 60%;
      height: 100%;
    }
  }
`;

function IA() {
  const [isIAMenuVisible, setIAMenuVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [imageCropped, setImageCropped] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);
  const [fileResult, setFileResult] = useState(null);
  const [isResultReady, setResultReady] = useState(false);
  const [isFileOnQueue, setIsFileonQueue] = useState(null);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [docxBuffer, setDocxBuffer] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [modal, setModal] = useState(null);
  const [serverImageName, setServerImageName] = useState(null);
  const [IAresults, setIAResults] = useState(null);
  const [IAGlobalResults, setIAGlobalResult] = useState(null);
  const [fail, setFail] = useState(false);
  const authPayload = useGetAuthPayload();

  useEffect(() => {
    if (pdfURL !== null) {
      setResultReady(true);
    }
  }, [pdfURL]);

  /*  useEffect(() => {
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
            isPers: true,
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
  }, []); */

  const convertBlobToPDF = async (blob, filename) => {
    const blobToDataURL = (blob) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    };

    // Create a new instance of jsPDF
    const pdf = new jsPDF("l", "cm", [21, 29.7]);

    // Convert the blob to a data URL
    const dataUrl = await blobToDataURL(blob);

    // Add the image to the PDF
    pdf.addImage(dataUrl, "PNG", 0, 0, 29.7, 21);

    // Save or download the PDF
    return pdf.output("blob");
  };

  const test = async () => {
    const response = await fetch(imageCropped);
    const blob = await response.blob();
    const pdf = await convertBlobToPDF(blob, "output.pdf");
    const pdfURL = URL.createObjectURL(pdf);
    window.open(pdfURL, "_blank");
  };

  useEffect(() => {
    const sendImage = async () => {
      if (!imageCropped) {
        return;
      }
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000);
      try {
        // Convert blob URL to blob
        const response = await fetch(imageCropped);
        const blob = await response.blob();
        const pdf = await convertBlobToPDF(blob, "output.pdf");
        // Create FormData and append the blob with a file name
        const formData = new FormData();
        let imageBlob = new File([blob], "NombrePrueba.png", {
          type: "image/png",
        });
        formData.append("image", imageBlob, "image.png");

        // Send the FormData to the server
        
        const requestURL = `${API_BASE_URL}${SEND_IA_URL}`;
        const serverResponse = await fetch(requestURL, {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });
        if (serverResponse.ok) {
          //const response = await serverResponse.json()
          const result = await serverResponse.json();
          setIAGlobalResult(result.ia.calificacionGlobal);
          setIAResults(result.ia.resultados);
          const decodedBuffer = Uint8Array.from(atob(result.docxBuffer), (c) =>
            c.charCodeAt(0)
          );
          setDocxBuffer(decodedBuffer);
          const pdfURL = URL.createObjectURL(pdf);
          setPdfURL(pdfURL);
          setServerImageName(result.ia.nombreArchivo);
          setResultReady(true);
          /*const responseblob = await serverResponse.blob();
          const file = new Blob([responseblob], {type: 'application/pdf'});
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          console.log(responseblob);
          console.log(serverResponse);

          // Open the PDF in a new tab
          //window.open(pdfUrl, "_blank");
          //console.log(responseData);
          */
        } else {
          console.log(serverResponse.json());
          console.error("Error uploading image:", serverResponse.status);
          setFail(true);
        }
      } catch (error) {
        if(error.name === "AbortError"){
          console.error("Error timeout error:", error);
        } else{
          console.error("Error uploading image:", error);
        }
        setFail(true);
      } finally {
        clearTimeout(timeoutId); 
      }
    };

    sendImage();
    if (!imageCropped) {
      return;
    }
    //test();
  }, [imageCropped]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfURL;
    link.download = "downloaded-file.pdf"; // Set the desired filename
    link.click();
  };

  const handleImageChange = (evt) => {
    const file = evt.target.files[0];
    setImage(file);
  };

  const handleEraseImage = () => {
    setImage(null);
  };

  const handleImageCropped = (imageCropped) => {
    setImageCropped(imageCropped);
  };

  const handleMenuReturnFileClic = () => {
    setIAMenuVisibility(false);
  };

  const handleOverlay = (value) => {
    setOverlay(value);
  };

  const handleSaveClick = () => {
    setModal(
      <SaveModal
        serverImageName={serverImageName}
        image={imageCropped}
        handleClose={() => handleOverlay(false)}
        punctuation={IAGlobalResults}
      />
    );
  };

  const handleDocDownload = () => {
    const blob = new Blob([docxBuffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "resultado.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <StyledIA>
      <AnimatePresence>
        {overlay && (
          <OverlayModal handleClose={() => handleOverlay(false)}>
            {modal && modal}
          </OverlayModal>
        )}
      </AnimatePresence>
      <motion.div
        className="header-ia"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div>
          <h2>PALALA</h2>
          <p>Bienvenido a la Inteligencia Artificial PALALA</p>
        </div>
        <motion.div
          whileHover={{
            rotateY: [0, 90, 180, 270, 360],
            scale: [1, 1.5, 1],
            transition: {
              duration: 0.7,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            },
          }}
        >
          <lord-icon
            src="https://cdn.lordicon.com/pvucrfqe.json"
            trigger="loop"
            delay="3000"
            colors="primary:#fe5d41,secondary:#ffbe0a"
            style={{ width: "10rem", height: "8rem" }}
          ></lord-icon>
        </motion.div>
      </motion.div>
      {
        //    <iframe src="https://www.africau.edu/images/default/sample.pdf" title="Caligrafía" width={"100%"} height={"100%"}/>
      }
      {fail ? (
        <motion.div style={{display: "flex", width: "90%",  flexGrow: 0.8}}>
          <Fail />
        </motion.div>
      ) : (
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <AnimatePresence>
            {image === null && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{ position: "absolute", top: 0 }}
                className="upload-ia"
              >
                <UploadIA handleImageChange={handleImageChange} />
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-evenly",
                    marginTop: "3rem",
                  }}
                >
                  <ButtonSubmit
                    styles={{ height: "5rem" }}
                    label={
                      <a
                        style={{ textDecoration: "none", color: "#FFFFFF" }}
                        href="./assets/docs/plantilla_mayus_vacia.pdf"
                        download="plantilla_mayus_vacia.pdf"
                      >
                        Plantilla Mayúscula
                      </a>
                    }
                  />
                  <ButtonSubmit
                    styles={{ height: "5rem" }}
                    label={
                      <a
                        style={{ textDecoration: "none", color: "#FFFFFF" }}
                        href="./assets/docs/plantilla_minus_vacia.pdf"
                        download="plantilla_minus_vacia.pdf"
                      >
                        Plantilla Minúscula
                      </a>
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(image != null) & (imageCropped === null) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: "absolute", top: 0 }}
                className="cropper-ia"
              >
                <ImageCropper
                  imgURL={URL.createObjectURL(image)}
                  handleReturn={handleEraseImage}
                  handleImageCropped={handleImageCropped}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {imageCropped !== null && !isResultReady && (
            <motion.div
              className="loading-file"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ position: "absolute", top: 0 }}
            >
              <motion.div
                initial={{ y: 50, scale: 0, opacity: 0 }}
                transition={{
                  y: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                }}
                animate={{ y: [0, -30, 0], scale: 1, opacity: 1 }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/gwxsygdo.json"
                  class="loading-lord-icon"
                  trigger="loop"
                  colors="primary:#fe5d41,secondary:#ffbe0a"
                  style={{}}
                />
              </motion.div>
              <div className="loading-file-info">
                {!isFileUpload && (
                  <motion.p
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    exit={{ x: 50 }}
                  >
                    Tu archivo se está subiendo
                  </motion.p>
                )}
                {isFileOnQueue && (
                  <motion.p
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    exit={{ x: 50 }}
                  >
                    Tu resultado se está procesando
                  </motion.p>
                )}
                <TextCarousel
                  color={"#fe5d41"}
                  direction={"horizontal"}
                  words={[
                    <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                      Aprender a escribir ayuda a la imaginación y a aprender
                    </p>,
                    <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                      En un momento recibirás tu archivo
                    </p>,
                  ]}
                />
              </div>
            </motion.div>
          )}
          
          {(isResultReady && IAGlobalResults) && (
            <motion.div
              className="result-viewer"
              style={{ position: "absolute", top: 0 }}
            >
              <motion.div>
                <PDFViewer pdfFile={pdfURL} wordFile={docxBuffer} />
              </motion.div>
              <div className="result-viewer-buttons">
                <motion.div className="no-desktop-768">
                  <ButtonSubmit
                    label={
                      <>
                        <FontAwesomeIcon icon={faFont} /> Resultados{" "}
                      </>
                    }
                    onClick={setIAMenuVisibility}
                  />
                </motion.div>
                <motion.div>
                  <ButtonSubmit
                    label={
                      <>
                        <FontAwesomeIcon icon={faFileArrowDown} /> Descargar{" "}
                      </>
                    }
                    onClick={handleDocDownload}
                  />
                </motion.div>
                {authPayload && authPayload.userType === "alumno" && (
                  <motion.div>
                    <ButtonSubmit
                      label={
                        <>
                          <FontAwesomeIcon icon={faFloppyDisk} /> Guardar{" "}
                        </>
                      }
                      onClick={() => (handleSaveClick(), handleOverlay(true))}
                    />
                  </motion.div>
                )}
              </div>
              <motion.div
                className="desktop-768"
                style={{
                  display: "flex",
                  height: "25rem",
                  width: "100%",
                  position: "relative",
                }}
              >
                <MenuIA
                  handleMenuReturnFileClic={handleMenuReturnFileClic}
                  results={IAresults}
                  globalResult={IAGlobalResults}
                />
              </motion.div>
            </motion.div>
          )}

          {
            <div style={{ height: "50rem" }}>
              <AnimatePresence>
                {isIAMenuVisible && (
                  <MenuIA
                    handleMenuReturnFileClic={handleMenuReturnFileClic}
                    results={IAresults}
                    globalResult={IAGlobalResults}
                  />
                )}
              </AnimatePresence>
            </div>
          }
        </motion.div>
      )}
    </StyledIA>
  );
}

export default IA;
