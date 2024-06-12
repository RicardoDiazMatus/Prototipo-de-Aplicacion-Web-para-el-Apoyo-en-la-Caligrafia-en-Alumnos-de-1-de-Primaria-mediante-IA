import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import styled from "styled-components";
import ButtonSubmit from "../components/Utils/ButtonSubmit/ButtonSubmit";
import { useInView } from "react-intersection-observer";

const StyledContact = styled(motion.div)`
  display: flex;
  background-color: #ffbe0a;
  flex-direction: column;
  min-height: 100vh;
  .contact-info {
    margin: 0 auto;
    width: 90%;
    flex-grow: 0.3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }
  .contact-form {
    display: flex;
    flex-direction: column;
    flex-grow: 0.6;
    form {
      background-color: #ffffff;
      -webkit-box-shadow: 0px 1px 61px -17px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 1px 61px -17px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 1px 61px -17px rgba(0, 0, 0, 0.75);
      border-radius: 1rem;
      padding: 3rem;
      display: flex;
      flex-grow: 0.5;
      flex-direction: column;
      justify-content: space-around;
      width: 90%;
      margin: 0 auto;
      div {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      > div {
        &:first-of-type {
          gap: 1rem;
          div {
            flex-basis: 50%;
          }
        }
      }
      label {
        font-size: 1.3rem;
        font-weight: bold;
      }
      input {
        height: 3rem;
        font-size: 1.2rem;
      }
      input,
      textarea {
        box-shadow: none;
        border-radius: 0.5rem;
        background-color: #eeeeee;
      }
    }
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    .contact-info {
      justify-content: center;
      align-items: start;
      width: 0;
      flex-grow: 0;
      flex-basis: 40%;
      padding-bottom: 30rem;
    }
    .contact-form {
      width: 0;
      flex-grow: 0;
      flex-basis: 40%;
      justify-content: center;
      form {
        flex-grow: 0.3;
        > div {
          &:first-of-type {
            flex-direction: row;
          }
        }
      }
    }
  }
`;

function Contact() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  const visibleVariants = {
    show: { scale: 1, transition: { duration: 0.3 } },
    hidden: { scale: 0 },
  };

  return (
    <StyledContact
      ref={ref}
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
      initial="hidden"
      animate={controls}
    >
      <motion.div
        variants={{
          hidden: { scale: 0 },
          show: {
            scale: 1,
            transition: { duration: 0.3, staggerChildren: 0.1 },
          },
        }}
        className="contact-info"
      >
        <motion.h1 variants={visibleVariants}>Contáctanos</motion.h1>
        <motion.p variants={visibleVariants}>
          ¿Necesitas ponerte en contacto con nosotros? Llena el formato que se
          encuentra a continuación con tu solicitud y te contactaremos a la
          brevedad.
        </motion.p>
      </motion.div>
      <motion.div className="contact-form">
        <motion.form variants={visibleVariants}>
          <motion.div>
            <motion.div>
              <motion.label htmlFor="firstname">Nombre*</motion.label>
              <motion.input type="text" name="firstname" />
            </motion.div>
            <motion.div>
              <motion.label htmlFor="lastname">Apellido</motion.label>
              <motion.input type="text" name="lastname" />
            </motion.div>
          </motion.div>
          <motion.div>
            <motion.div>
              <motion.label htmlFor="email">Email*</motion.label>
              <motion.input type="email" name="email" />
            </motion.div>
          </motion.div>
          <motion.div>
            <motion.div>
              <motion.label htmlFor="textarea">Solicitud*</motion.label>
              <motion.textarea name="textarea" rows="6" />
            </motion.div>
          </motion.div>
          <motion.div>
            <motion.div>
              <ButtonSubmit label={"Enviar"} />
            </motion.div>
          </motion.div>
        </motion.form>
      </motion.div>
    </StyledContact>
  );
}

export default Contact;
