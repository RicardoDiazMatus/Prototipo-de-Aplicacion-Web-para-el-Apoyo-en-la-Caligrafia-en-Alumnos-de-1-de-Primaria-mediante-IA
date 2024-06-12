import React, { useEffect, useState } from "react";
import { StyledHero } from "./Hero.styled";
import Upload from "./Upload/Upload";
import TextCarousel from "../../Utils/WordCarousel/TextCarousel";
import ImageCarousel from "../../Utils/ImageCarousel/ImageCarousel";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Bubble from "./Bubble/Bubble";
function Hero() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const visibleVariants = {
    show: { scale: 1, transition: { duration: 0.3 } },
    hidden: { scale: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <StyledHero
      ref={ref}
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      animate={controls}
    >
      <motion.div className="hero-icons-container" variants={visibleVariants}>
        <div className="hero-icons" >
          <Bubble
            label="Multimedia"
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/jcgnduhr.json"
                trigger="hover"
                style={{ width: "8rem", height: "8rem" }}
              ></lord-icon>
            }
          />
          <Bubble
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/ujxzdfjx.json"
                trigger="loop"
                style={{ width: "8rem", height: "8rem" }}
              ></lord-icon>
            }
            label="Plantilla"
          />
          <Bubble
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/pcllgpqm.json"
                trigger="loop"
                style={{ width: "8rem", height: "8rem" }}
              ></lord-icon>
            }
            label="Ejercicios"
          />
        </div>
        <div className="hero-icons">
          <Bubble
            label="Retroalimentación IA"
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/xumlwjxf.json"
                trigger="loop"
                style={{ width: "8rem", height: "8rem" }}
              ></lord-icon>
            }
          />
          <Bubble
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/tnhofnig.json"
                trigger="loop"
                style={{ width: "8rem", height: "8rem" }}
              ></lord-icon>
            }
            label="Calificación"
          />
          <Bubble
            icon={
              <lord-icon
                src="https://cdn.lordicon.com/lqbssemm.json"
                trigger="hover"
                style={{ width: "8rem", height: "8rem" }}
              ></lord-icon>
            }
            label="Seguimiento Profesor"
          />
        </div>
      </motion.div>
      <motion.h2 variants={visibleVariants} className="hero-title">
        Bienvenido a Palala IA
      </motion.h2>
      <motion.div variants={visibleVariants} className="hero-subtitle">
        <h2>Utiliza</h2>
        <h2>Nuestra IA</h2>
        <h2>para mejorar</h2>
        <div>
          <TextCarousel
            words={[<h2>Caligrafía</h2>, <h2>Trazos</h2>, <h2>Letras</h2>]}
            color={"#FFBE0A"}
            direction={"vertical"}
          />
        </div>
      </motion.div>
      <motion.div variants={visibleVariants} className="hero-text">
        <p>Mejora tu habilidad con nuestra plantilla</p>
        <p>estructurada para caligrafía</p>
      </motion.div>
      <motion.div variants={visibleVariants} className="hero-options">
        <a href="./assets/docs/plantillas.pdf" download="plantillas.pdf" target="_blank">Plantillas</a>
        <a href="./assets/docs/aviso_de_privacidad.pdf" target="_blank">Privacidad</a>
        <a href="./assets/docs/terminos_y_condiciones.pdf" target="_blank">Términos</a>
      </motion.div>
      <motion.div variants={visibleVariants} style={{zIndex: 2}}>
        <Upload />
      </motion.div>
      <div className="hero-carousel-section">
        <motion.div variants={visibleVariants} className="hero-text-carousel">
          <TextCarousel
            words={[
              <h2>Plantilla Especializada</h2>,
              <h2>Retroalimentación de IA</h2>,
              <h2>Almacenamiento de Archivos</h2>,
            ]}
            color={"#000000"}
            direction={"horizontal"}
            delay={5000}
          />
        </motion.div>
        <motion.div variants={visibleVariants} className="hero-image-carousel">
          <motion.div>
            <ImageCarousel
              isSlidable={false}
              imageList={[
                "./assets/images/plantilla_mayus_vacia.svg",
                "./assets/images/ia_1.png",
                
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </StyledHero>
  );
}

export default Hero;
