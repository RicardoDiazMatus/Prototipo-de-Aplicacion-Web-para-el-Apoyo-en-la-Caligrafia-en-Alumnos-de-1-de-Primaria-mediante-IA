import { styled } from "styled-components";

export const StyledNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5.3rem;
  -webkit-box-shadow: 0px 5px 9px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 9px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  box-sizing: border-box;
  position: fixed;
  z-index: 3;
  top: 0;

  .navbar-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  @media (min-width: 768px) {
    .navbar-logo {
      height: 4rem;
      width: 5rem;
    }
  }
`;
