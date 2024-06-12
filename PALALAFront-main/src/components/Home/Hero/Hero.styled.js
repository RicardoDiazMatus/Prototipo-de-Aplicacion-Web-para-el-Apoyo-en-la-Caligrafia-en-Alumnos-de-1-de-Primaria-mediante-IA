import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledHero = styled(motion.div)`
  height: 70.7rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .hero-icons-container {
    position: absolute;
    display: none;
    justify-content: space-around;
    width: 100%;
    top: 10rem;
    height: 50rem;
    z-index: 1;
    .hero-icons {
      
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      width: 20%;
      &:first-child {
        > div {
          &:first-child {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
          }
          grid-column: 1 / 2;
          grid-row: 2/ 3;
          &:last-child {
            grid-column: 2 / 3;
            grid-row: 3 / 4;
          }
        }
      }
      &:last-child {
        > div {
          &:first-child {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
          }
          grid-column: 2 / 3;
          grid-row: 2/ 3;
          &:last-child {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
          }
        }
      }
    }
  }

  .hero-title {
    color: #ffbe0a;
    z-index: 2;
    text-transform: uppercase;
    font-weight: normal;
  }
  .hero-subtitle {
    z-index: 2;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin: 0.5rem;
      &:last-child {
        color: #ffbe0a;
      }
    }

    > div {
      height: 5rem;
    }
  }
  .hero-text {
    z-index: 2;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #a8a8a8;
  }
  .hero-options {
    z-index: 2;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    color: #a8a8a8;
    a {
      padding: 0 1rem;
      cursor: pointer;
      border-right: #a8a8a8 solid 0.1rem;
      &:last-child {
        border-right: none;
      }
      &:hover {
        color: #ffbe0a;
        cursor: pointer;
      }
      transition: color 0.3s ease-in-out;
    }
  }

  .hero-carousel-section {
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    
  }

  .hero-text-carousel{
    z-index: 2;
    width: 100%;
  }

  .hero-image-carousel {
    width: 30rem;
    flex-basis: 55%;
    z-index: -1;
    > div {
      height: 18rem;
      border: #a8a8a8 solid 0.4rem;
      border-radius: 3rem;
      -webkit-box-shadow: 0px 5px 9px 1px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 5px 9px 1px rgba(0, 0, 0, 0.5);
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
    }
    img {
      border-radius: 4rem;
    }
  }

  @media (min-width: 1024px) {
    height: calc(100vh - 7.3rem);
    .hero-icons-container {
      display: flex;
    }
    .hero-icons{

    }
    .hero-carousel-section {
      margin-top: 25rem;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 3rem;
      gap: 3rem;
    }
    .hero-text-carousel{
      display: flex;
      justify-content: center;
      flex-basis: 40%;
    }
    .hero-image-carousel {
      display: flex;
      flex-basis: 40%;
      justify-content: center;
      > div{
        width: 40rem;
        height: 30rem;
      }
      z-index: 2;
    }
  }
`;
