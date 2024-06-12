import { styled } from "styled-components";

export const StyledProfessorNavbar = styled.div`
  display: flex;
  flex-direction: column;
  .navbar-professor {
    z-index: 3;
    width: 100%;
    height: 6.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #ffbe0a;
    color: #fe5d41;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    border-bottom: #db270d solid 0.2rem;
    > div {
      flex-basis: 30%;
      display: flex;
      justify-content: space-between;
      &:last-of-type {
        flex-basis: 10%;
      }
    }
  }

  .navbar-profile-icon {
    background-color: #fe5d41;
    color: #ffffff;//#ffbe0a;
    padding: 1rem;
    border-radius: 1rem;
    border: #ffffff solid 0.2rem;
    transition: all 0.3s ease-in-out;
    &:hover {
      cursor: pointer;
      background-color: #db270d;
      -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    }
  }

  .professor-content {
    display: flex;
    background-color: #fff8e6;
    min-height: calc(100vh - 6.5rem);
  }
  .professor-content-principal {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: 100%;
  }

  .sticky {
    position: fixed;
    top: 0;
  }

  @media (min-width: 460px) {
    .navbar-professor {
      > div {
        flex-basis: 20%;
      }
    }
  }

  @media (min-width: 768px) {
    .navbar-professor {
      > div {
        flex-basis: 10%;
      }
    }
  }
`;
