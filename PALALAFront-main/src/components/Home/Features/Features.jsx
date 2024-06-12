import React, { useEffect } from "react";
import { StyledFeatures } from "./Features.styled";
import InfoBox from "./InfoBox/InfoBox";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
function Features() {
  const controlsCircle = useAnimation();
  const controlsFeaturesContainer = useAnimation();
  const [refInnerCircle, inViewInnerCircle] = useInView();
  const [refFeaturesContainer, inViewFeaturesContainer] = useInView();
  const visibleVariants = {
    show: { scale: 1, transition: { duration: 0.3 } },
    hidden: { scale: 0 },
  };

  useEffect(() => {
    if (inViewInnerCircle) {
      controlsCircle.start("show");
    }
  }, [controlsCircle, inViewInnerCircle]);

  useEffect(() => {
    if (inViewFeaturesContainer) {
      controlsFeaturesContainer.start("show");
    }
  }, [controlsFeaturesContainer, inViewFeaturesContainer]);

  return (
    <StyledFeatures>
      <motion.div
        ref={refInnerCircle}
        variants={{
          hidden: { opacity: 1 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.4, delayChildren: 1.2 },
          },
        }}
        initial="hidden"
        animate={controlsCircle}
        className="features-inner-circle"
      >
        <motion.div variants={visibleVariants}></motion.div>
        <motion.div variants={visibleVariants}>
          <lord-icon
            src="https://cdn.lordicon.com/azyvnypg.json"
            trigger="loop"
            delay="3000"
            style={{ width: 250, height: 250 }}
          ></lord-icon>
        </motion.div>
      </motion.div>
      <motion.div
        ref={refFeaturesContainer}
        variants={{
          hidden: { opacity: 1 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 1 },
          },
        }}
        initial="hidden"
        animate={controlsFeaturesContainer}
        style={{ flexGrow: 1 }}
      >
        <motion.h2 variants={visibleVariants}>
          Cómo PALALA Apoya en la Caligrafía
        </motion.h2>
        <motion.div className="features-container">
          <motion.div variants={visibleVariants}>
            <InfoBox
              img={
                <lord-icon
                  src="https://cdn.lordicon.com/hifghmba.json"
                  trigger="hover"
                  delay="3000"
                  style={{ width: 150, height: 150 }}
                ></lord-icon>
              }
              title="Plantilla"
              text="Contamos con una plantilla especializada para practicas las letras de tipo molde"
            />
          </motion.div>
          <motion.div variants={visibleVariants}>
            <InfoBox
              img={
                <lord-icon
                  src="https://cdn.lordicon.com/rlovzwva.json"
                  trigger="hover"
                  delay="3000"
                  style={{ width: 150, height: 150 }}
                ></lord-icon>
              }
              title="Impulsado por IA"
              text="Análisis de la caligrafía a través de una inteligencia artificial"
            />
          </motion.div>
          <motion.div variants={visibleVariants}>
            <InfoBox
              img={
                <lord-icon
                  src="https://cdn.lordicon.com/zfmcashd.json"
                  trigger="hover"
                  delay="3000"
                  style={{ width: 150, height: 150 }}
                ></lord-icon>
              }
              title="Seguimiento Profesor"
              text="Retroalimentación personal por parte del profesor a cargo"
            />
          </motion.div>
          <motion.div variants={visibleVariants}>
            <InfoBox
              img={
                <lord-icon
                  src="https://cdn.lordicon.com/kgvlhryh.json"
                  trigger="hover"
                  delay="3000"
                  style={{ width: 150, height: 150 }}
                ></lord-icon>
              }
              title="Multimedia"
              text="Apartado de contido multimedia relacionado al trazado de las letras de tipo molde"
            />
          </motion.div>
          <motion.div variants={visibleVariants} className="desktop-768">
            <InfoBox
              img={
                <lord-icon
                  src="https://cdn.lordicon.com/hungkruo.json"
                  trigger="hover"
                  delay="3000"
                  style={{ width: 150, height: 150 }}
                ></lord-icon>
              }
              title="Classroom Virtual"
              text="Posibilidad de unirse a grupos generados por profesores"
            />
          </motion.div>
          <motion.div variants={visibleVariants} className="desktop-768">
            <InfoBox
              img={
                <lord-icon
                  src="https://cdn.lordicon.com/pdwpcpva.json"
                  trigger="loop"
                  delay="3000"
                  style={{ width: 150, height: 150 }}
                ></lord-icon>
              }
              title="Seguridad"
              text="Protección de datos sensibles"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </StyledFeatures>
  );
}

export default Features;
