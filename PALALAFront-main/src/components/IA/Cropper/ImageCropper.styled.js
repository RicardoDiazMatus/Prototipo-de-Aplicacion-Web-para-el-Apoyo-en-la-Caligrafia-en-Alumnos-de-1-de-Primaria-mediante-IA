import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledImageCropper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
  .cropper {
    position: relative;
    width: 90%;
    height: 30rem;
  }

  .cropper-options {
    display: flex;
    flex-grow: 1;
    gap: 10rem;
    width: 90%;
  }

  .cropper-preview {
    display: none;
  }

  .cropper-controls {
    margin-top: 1rem;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    flex-direction: column;
    gap: 2rem;

    > div {
      display: flex;
      width: 100%;
      gap: 2rem;
      > div {
        flex-grow: 1;
      }
    }

    .cropper-titles{
        flex-direction: column;
        gap: 0.5rem;
    }

    .cropper-buttons {
      justify-content: space-around;
    }
  }

  .zoom-range {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 0.2rem;
    border-top: 0.2rem solid #ffbe0a;
    border-bottom: 0.2rem solid #ffbe0a;
    border-radius: 2rem;
    background: #ffbe0a;
    width: 100%;
  }

  .zoom-range::-moz-range-thumb {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #fe5d41;
    background: #fe5d41;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .zoom-range::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid #fe5d41;
    background: #fe5d41;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    cursor: pointer;
    
  }

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 0 auto;
    justify-content: space-between;
    gap: 5rem;
    width: 90%;
    .cropper{
        flex-basis: calc(60% );
        height: 90%;
    }

    .cropper-options{
        flex-basis: calc(30% );
        align-self: baseline;
        height: 60%;
    }
    /*
    .cropper{
        height: 45rem;
    }
    .cropper-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      
      > div {
        position: relative;
        width: 30rem;
        overflow: hidden;
        box-shadow: 0 0 32px rgba(0, 0, 0, 0.3);

        > img {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center center;
        }
      }
    }
    */
  }
`;
