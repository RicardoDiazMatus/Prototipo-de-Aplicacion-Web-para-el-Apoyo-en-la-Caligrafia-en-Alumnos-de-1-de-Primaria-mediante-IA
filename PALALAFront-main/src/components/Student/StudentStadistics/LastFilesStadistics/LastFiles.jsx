import React, { useEffect, useState } from "react";
import { StyledLastFile } from "./LastFiles.syled";
import { motion } from "framer-motion";
import StudentMenuSlider from "../../StudentHome/StudentMenuSlider/StudentMenuSlider";
import TextCarousel from "../../../Utils/WordCarousel/TextCarousel";
import ButtonSubmit from "../../../Utils/ButtonSubmit/ButtonSubmit";
import NoData from "../../../Utils/NoData/NoData";
import Loading from "../../../Utils/Loading/Loading";

function CommentCard({comment, fileName}) {
  return (
    <motion.div className="stadistics-comment-card">
      <motion.div>
        <lord-icon
          src="https://cdn.lordicon.com/scetkzfv.json"
          trigger="loop"
          delay="5000"
        ></lord-icon>
      </motion.div>
      <motion.div>
        <motion.p>{comment ? (comment) : ("Sin Comentario")}</motion.p>
        <motion.h3>{fileName}</motion.h3>
      </motion.div>
    </motion.div>
  );
}

function FileCard({name, date, punctuation}) {
  return (
    <motion.div className="stadistics-file-card">
      <motion.div>
        <lord-icon
          className="icon"
          src="https://cdn.lordicon.com/ckatldkn.json"
          trigger="loop"
          delay="5000"
          colors="primary:#646e78,secondary:#e8e230,tertiary:#ebe6ef"
        ></lord-icon>
      </motion.div>
      <motion.div>
        <motion.h2>{name}</motion.h2>
        <motion.div>
          <motion.p>Fecha de Creación: { new Date(date).toISOString().split("T")[0]}</motion.p>
          <motion.p>Puntuación: {punctuation}</motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function LastFile({ filesArray, commentsArray}) {
  const [filesData, setFilesData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);

  useEffect(() => {
    setFilesData(filesArray);
    setCommentsData(commentsArray);
  }, [filesArray, commentsArray])

  return (
    <StyledLastFile>
      {filesData === null ? (
        <Loading loadingInfo={"Cargando tus archivos"} iconheight="10rem" />
      ) : filesData.length === 0 ? (
        <NoData label={"No tienes archivos"} height="10rem" widthimg="10rem" />
      ) : (
        <TextCarousel delay={10000} words={filesData.map((item) => (<FileCard name={item.name} date={item.date} punctuation={item.punctuation} />))} />
      )}
      {commentsData === null ? (
        <Loading loadingInfo={"Cargando comentarios"} iconheight="10rem" />
      ) : commentsData.length === 0 ? (
        <NoData label={"No tienes comentarios"} height="10rem" widthimg="10rem" />
      ) : (
        <TextCarousel delay={10000} words={commentsData.map((item) => (<CommentCard comment={item.comment} fileName={item.name} />))} />
      )}

      
    </StyledLastFile>
  );
}

export default LastFile;
