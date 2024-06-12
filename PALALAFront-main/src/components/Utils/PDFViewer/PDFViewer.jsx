import React, { useState } from "react";
import { StyledPDFViewer } from "./PDFViewer.styled";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_BASE_URL } from "./../../../utils/config";
import {
  faFileArrowDown,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ width, pdfFile, wordFile, idFile }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level is 100%
  const [PDFFile, setPDFFile] = useState(
    pdfFile ? pdfFile : `./assets/docs/noFound.pdf`
  );
  const minZoom = 1; // Adjust as needed
  const maxZoom = 3.0; // Adjust as needed

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handleDownload = () => {
    const link = document.createElement("a");

    link.href = pdfFile;
    link.download = idFile ? `imagen_${idFile}.pdf` : "imagen.pdf"; // Set the desired filename
    link.click();
  };

  const handleZoomIn = () => {
    if (zoomLevel < maxZoom) {
      setZoomLevel(zoomLevel + 0.1); // Increase the zoom level
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > minZoom) {
      setZoomLevel(zoomLevel - 0.1); // Decrease the zoom level
    }
  };

  return (
    <StyledPDFViewer>
      <div className="pdf-viewer-buttons">
        <div>
          <ButtonSubmit
            label={<FontAwesomeIcon icon={faFileArrowDown} />}
            styles={{ width: "4rem", boxshadow: "none" }}
            onClick={handleDownload}
          />
        </div>
        <div>
          <ButtonSubmit
            label={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}
            styles={{ width: "4rem", boxshadow: "none" }}
            onClick={handleZoomIn}
          />
          <ButtonSubmit
            label={<FontAwesomeIcon icon={faMagnifyingGlassMinus} />}
            styles={{ width: "4rem", boxshadow: "none" }}
            onClick={handleZoomOut}
          />
        </div>
      </div>
      <div className="pdf-viewer-doc">
        <Document
          file={PDFFile}
          loading={"Cargando Archivo..."}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={1} width={370} scale={zoomLevel} />
        </Document>
      </div>
    </StyledPDFViewer>
  );
}

export default PDFViewer;
