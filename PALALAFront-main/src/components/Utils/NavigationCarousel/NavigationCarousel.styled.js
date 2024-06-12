import { styled } from "styled-components";

export const StyledNavigationCarousel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .navigation-carousel-header {
    display: flex;
    padding: 0 1rem;
    justify-content: ${(props) =>
      props.headerspace ? props.headerspace : "none"};
    border-bottom: #a8a8a8 solid 0.1rem;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      padding: 0 3rem;
      color: #fe5d41;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      &.header-select {
        background-color: #ffdfd9;
        color: #db270d;
        &:after {
          transform: scaleX(1);
        }
      }

      &:after {
        position: absolute;
        bottom: 0;
        border-radius: 0.5rem 0.5rem 0 0;
        width: 100%;
        content: "";
        height: 0.4rem;
        background-color: #fe5d41;
        //border-bottom: solid 0.3rem #fe5d41;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out;
      }

      &:hover {
        &:after {
          transform: scaleX(1);
        }
        background-color: #ffdfd9;
        color: #db270d;
      }
    }
  }

  .navigation-carousel-body {
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .navigation-carousel-body-element {
    
    
    flex-grow: 1;
  }

  /*
  .navigation-carousel-body{
    width: 100%;
    position: relative;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .navigation-carousel-body-element{
    position: absolute;
    width: 100%;
    flex-grow: 1;
  }
  */
`;
