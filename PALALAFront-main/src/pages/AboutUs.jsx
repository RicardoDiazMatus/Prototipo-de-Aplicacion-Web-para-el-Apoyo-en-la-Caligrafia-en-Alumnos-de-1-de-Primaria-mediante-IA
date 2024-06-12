import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const StyledAboutUs = styled(motion.div)`
  width: 100%;
  background-color: #ffbe0a;
  > div {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0;
  }

  h1 {
    text-align: center;
  }
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
  section {
    margin-top: 3rem;
    > div {
      display: flex;
      gap: 2rem;
      flex-direction: column;
      p {
        margin: 1rem 0;
        text-align: justify;
      }
      > div {
        width: 100%;
        height: 40rem;
        border: #fe5d41 dashed 0.7rem;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        img {
          max-width: 70%;
          max-height: 70%;
        }
      }
    }
  }
  @media (min-width: 768px) {
    > div {
      width: 80%;
    }
    section {
      > div {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        p {
          
          flex-basis: 50%;
        }
        > div {
          display: flex;
          justify-content: center;
          flex-basis: 25%;
          height: 30rem;
        }
      }
    }

    .reverse {
      > div {
        flex-direction: row-reverse;
        
      }
    }
  }
`;
function AboutUs() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const visibleVariants = {
    show: {
      scale: 1,
      transition: { duration: 0.3, staggerChildren: 0.5, delayChildren: 1 },
    },
    hidden: { scale: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <StyledAboutUs
      ref={ref}
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      animate={controls}
    >
      <motion.div>
        <motion.header>
          <motion.h1 variants={visibleVariants}>Sobre Nosotros</motion.h1>
        </motion.header>

        <motion.section variants={visibleVariants}>
          <motion.h2>Impacto de la Crisis Sanitaria</motion.h2>
          <motion.div>
            <motion.p>
              Es innegable indicar que la crisis sanitaria a mediados del año
              2020 ha afectado a la población mundial. Esta problemática trajo
              consigo una transformación en las vías de comunicación y
              aprendizaje, ocasionando la utilización de las Tecnologías de la
              Información y la Comunicación, posicionándose como una de las
              principales herramientas en la ocupación diaria. Sin importar el
              dispositivo electrónico o servicio, éstas facilitan el acceso a
              contenido e información cotidiana para los usuarios.
            </motion.p>

            <motion.div>
              <motion.img
                animate={{
                  rotateZ: [0, -22, 0, 22, 0],
                  transition: { rotateZ: { repeat: Infinity, duration: 20 } },
                }}
                src="./assets/images/doctor_feliz_saltando.svg"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={visibleVariants} className="reverse">
          <motion.h2>Problema de Lectura y Escritura en México</motion.h2>
          <motion.div>
            <motion.p>
              En México, el problema de la lectura y escritura tiene una doble
              fundamentación: por un lado, el entorno familiar y, por otra, el
              académico. Esto aplica para todos los individuos, pero toma mayor
              relevancia en la población infantil; debido a que sus actividades
              y hábitos académicos fueron transformados por la pandemia,
              afectando en gran medida el desarrollo de las habilidades
              psicomotoras en esta etapa.
            </motion.p>
            <motion.div>
              <motion.img
                animate={{
                  rotateZ: [0, 22, 0, -22, 0],
                  transition: { rotateZ: { repeat: Infinity, duration: 20 } },
                }}
                src="./assets/images/niña_escritura.svg"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={visibleVariants}>
          <motion.h2>Prototipo para Mejorar la Caligrafía</motion.h2>
          <motion.div>
            <motion.p>
              La realización del presente prototipo tiene como primordial
              objetivo impactar de manera directa y benéfica al sector educativo
              primario; debido a que su principal población son alumnos de la
              Alcaldía Gustavo A. Madero que estén cursando el primer grado de
              educación primaria y requieran de una herramienta de apoyo
              confiable para el mejoramiento en la claridad y legibilidad de su
              caligrafía (trazado de letras de tipo molde Mayúsculas y
              minúsculas).
            </motion.p>
            <motion.div>
              <motion.img
                animate={{
                  rotateZ: [0, -22, 0, 22, 0],
                  transition: { rotateZ: { repeat: Infinity, duration: 20 } },
                }}
                src="./assets/images/dibujos_lapiz_guino.svg"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={visibleVariants} className="reverse">
          <motion.h2>Trabajo Terminal</motion.h2>
          <motion.div>
            <motion.p>
              Trabajo Terminal es un trabajo de titulación llamado “Prototipo de
              Aplicación Web para el Apoyo en la Caligrafía de los Alumnos de
              primer grado de Primaria, mediante una Técnica de Inteligencia
              Artificial No. 2023-B048” desarrollado por el equipo conformado
              por Díaz Matus Ricardo, González Morelos César Emiliano y López
              Gracia Angel Emmanuel, pertenecientes a la Escuela Superior de
              Computo del Instituto Politécnico Nacional, para cumplir con la
              opción de titulación curricular en la carrera de “Ingeniería en
              Sistemas Computacionales”.
            </motion.p>
            <motion.div>
              <motion.img
                animate={{
                  rotateZ: [0, 22, 0, -22, 0],
                  transition: { rotateZ: { repeat: Infinity, duration: 20 } },
                }}
                src="./assets/images/graduado.svg"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={visibleVariants}>
          <motion.h2>
            Esperamos que esta Aplicación Web les sea de mucha utilidad
          </motion.h2>
        </motion.section>
      </motion.div>
    </StyledAboutUs>
  );
}

export default AboutUs;
