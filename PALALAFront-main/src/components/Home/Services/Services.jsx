import React, { useEffect } from "react";
import { useState } from "react";
import { StyledServices } from "./Services.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChild,
  faHeadphones,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import ServiceCard from "./ServiceCard/ServiceCard";
import NavigationCarousel from "../../Utils/NavigationCarousel/NavigationCarousel";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useGetAuthPayload } from "../../../utils/hooks/hooks";
function Services() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const authPayload = useGetAuthPayload();
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  //Initialize active card
  const serviceElements = [
    {
      headerElement: <FontAwesomeIcon icon={faChild} />,
      bodyElement: (
        <ServiceCard
          title="Alumno"
          description="Los alumnos tienen los siguientes servicios:"
          features={[
            "Retroalimentación por parte de la IA",
            "Guardar archivos en nuestra aplicación",
            "Compartir archivos en grupos",
            "Descarga de resultados",
          ]}
          link={
            authPayload
              ? authPayload.userType === "alumno"
                ? "/Student"
                : ""
              : "/Login"
          }
          linkLabel={ authPayload
            ? authPayload.userType === "alumno"
              ? "Ir al DashBoard"
              : (null)
            : "Iniciar Sesión"}
        />
      ),
    },
    {
      headerElement: <FontAwesomeIcon icon={faUserTie} />,
      bodyElement: (
        <ServiceCard
          title="Profesor"
          description="Los profesores tienen los siguientes servicios:"
          features={[
            "Generación de grupos",
            "Ver trabajos de los alumnos",
            "Posibilidad de dar retroalimentación",
            "Gestión de grupos",
          ]}
          link={
            authPayload
              ? authPayload.userType === "profesor"
                ? "/Professor"
                : ""
              : "/Login"
          }
          linkLabel={ authPayload
            ? authPayload.userType === "profesor"
              ? "Ir al DashBoard"
              : (null)
            : "Iniciar Sesión"}
        />
      ),
    },
    {
      headerElement: <FontAwesomeIcon icon={faHeadphones} />,
      bodyElement: (
        <ServiceCard
          title="Media"
          description="Nuestro apartado multimedia cuenta con:"
          features={[
            "Interfaz atractiva",
            "Vídeos de letras tanto mayúsculas",
            "Vídeos de letras tanto minúsculas",
          ]}
          link="/Media"
          linkLabel="Visitar Media"
        />
      ),
    },
  ];

  const visibleVariants = {
    show: { scale: 1, transition: { duration: 0.3 } },
    hidden: { scale: 0 },
  };

  return (
    <StyledServices
      ref={ref}
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      animate={controls}
    >
      <div className="services-title">
        <motion.h2 variants={visibleVariants}>Características</motion.h2>
        <motion.p variants={visibleVariants}>
          Características de la Página
        </motion.p>
      </div>
      {/*
        
      <div>
        <div className="services-icons">
          <FontAwesomeIcon
            icon={faChild}
            onClick={() => handleIconClick(0)}
            style={{ color: activeCardIndex === 0 ? "#FFBE0A" : "#A8A8A8" }}
          />
          <FontAwesomeIcon
            icon={faUserTie}
            onClick={() => handleIconClick(1)}
            style={{ color: activeCardIndex === 1 ? "#FFBE0A" : "#A8A8A8" }}
          />
          <FontAwesomeIcon
            icon={faHeadphones}
            onClick={() => handleIconClick(2)}
            style={{ color: activeCardIndex === 2 ? "#FFBE0A" : "#A8A8A8" }}
          />
        </div>
        <ServiceCard
          title="Alumno"
          description="Lorem ipsum dolor sit amet, consectetur"
          features={[
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
          ]}
          active={activeCardIndex === 0}
        />
        <ServiceCard
          title="Profesor"
          description="Lorem ipsum dolor sit amet, consectetur"
          features={[
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
          ]}
          active={activeCardIndex === 1}
        />
        <ServiceCard
          title="Media"
          description="Lorem ipsum dolor sit amet, consectetur"
          features={[
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
            "Lorem ipsum dolor sit amet, consectetur",
          ]}
          active={activeCardIndex === 2}
        />
      </div>
*/}
      <motion.div variants={visibleVariants}>
        <NavigationCarousel
          elements={serviceElements}
          headerspace={"space-evenly"}
        />
      </motion.div>
    </StyledServices>
  );
}

export default Services;
