import { styled } from "styled-components";

export const StyledProfessorMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //width: ${(props) => (props.open ? "30rem" : "7rem")};
  width: ${(props) => (props.open ? "25rem" : "0rem")};
  z-index: 2;
  background-color: #FFBE0A;
  height: calc(100vh - 6.3rem);
  z-index: 3;
  position: ${(props) => props.sticky ? "fixed" : "fixed"};
  border-top: ${(props) => props.sticky ? "#DB270D solid 0.3rem" : "none"};
  transition: all 0.1s ease-in-out;
  
  a{
    text-decoration: none;
    color: #FE5D41;
  }

  > div {
    border-top: #DB270D solid 0.2rem;
    border-bottom: #DB270D solid 0.2rem;
    padding: 0.5rem 0 0.5rem 0;
    &:first-of-type {
      border-top: none;
    }
    &:last-of-type {
      border-bottom: none;
    }
  }

  .menu-professor-element {
    width: 100%;
    color: #FE5D41;
    display: flex;
    height: 4rem;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(to right, #E0A600 50%, #FFBE0A 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    border-radius: 0 2rem 2rem 0;
    transition: all 0.3s ease-out;
    .menu-professor-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${(props) => (props.open ? "2rem" : "0rem")};
      flex-basis: 20%;
      height: 100%;
      transition: font-size 0.3s ease-in-out;
    }
    .menu-professor-title {
      display: flex;
      align-items: center;
      flex-basis: 70%;
      height: 100%;
      font-weight: bold;
      h3 {
        font-size: ${(props) => (props.open ? "1.6rem" : "0rem")};
        transition: font-size 0.3s ease-in-out;
      }
    }

    &:hover {
      background-position: left bottom;
    }
  }

  .selected {
    background-position: left bottom;
  }

  @media (min-width: 768px) {
    width: ${(props) => props.open ? '30rem' : '7rem'};
    overflow-x: hidden;
    .menu-professor-element{
        display: flex;
        width: 30rem;
        
        .menu-professor-icon{
            flex-basis: 6rem;
            font-size: 2rem;
            
            //flex-basis: ${(props) => (props.open ? "20%" : "100%")};
        }
        .menu-professor-title{
            p{
                font-size: 1.6rem;
            }
            //flex-basis: ${(props) => (props.open ? "70%" : "0%")};
        }
    }
  }
`;
