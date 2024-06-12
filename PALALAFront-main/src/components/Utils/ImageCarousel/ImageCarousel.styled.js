import { styled } from "styled-components";

export const StyledImageCarousel = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 100%;
    position: relative;
  
  .carousel-img{
    max-width: 100%;
    max-height: 100%;
  }

  .next,
  .prev {
    top: calc(50% - 20px);
    position: absolute;
    background: white;
    border-radius: 30px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    z-index: 2;
  }

  .next {
    right: 10px;
  }

  .prev {
    left: 10px;
    transform: scale(-1);
  }

  img {
    position: absolute;
    max-width: 100%;
  }

`;
