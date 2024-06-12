import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const StyledClassCard = styled(Link)`
  margin: 1rem auto 0 auto;
  height: 16.7rem; //1rem = 10px
  display: flex;
  background-color: ${(props) => props.backgroundcolour || "#FFdFFF"};
  border-radius: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
  transition: box-shadow 0.3s ease-in-out;
  color: #000000;
  min-width: 35rem;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    -webkit-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.5);
  }

  

  .classcard-principal-container {
    width: 90%;
    height: 70%;
    display: flex;
    justify-content: space-around;
  }

  .classcard-principal-container-img {
    width: 100%;
    height: 100%;

    img {
      max-width: 100%;
      max-height: 100%;
      
    }
  }

  .classcard-principal-container-info {
    width: 40%;
    display: flex;
    flex-direction: column;
    span {
      font-weight: bold;
      margin-top: 0.5rem;
      font-size: 1.3rem;
    }
  }

  .classcard-principal-container-students {
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      &:first-of-type {
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 1rem;
        -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.5);
      }
      &:last-of-type {
        display: flex;
        flex-direction: column;
      }
    }
    h4 {
      font-size: 2rem;
    }
  }

  .classcard-principal-container-code {
    width: 90%;
    p {
      font-size: 1.3rem;
      font-weight: bold;
    }
  }
`;
