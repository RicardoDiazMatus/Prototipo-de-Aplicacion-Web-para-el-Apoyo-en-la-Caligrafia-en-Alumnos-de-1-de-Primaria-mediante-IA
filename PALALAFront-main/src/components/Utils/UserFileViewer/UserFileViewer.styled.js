import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledUserFileViewer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .sfv-viewer {
    max-height: 100%;
    min-width: 100%;
  }

  .sfv-viewer-loading {
    background-color: #fe5d41;
    padding: 2rem;
    border-radius: 2rem 2rem 0 0;
  }

  .sfv-viewer-results {
    display: none;
  }
  .sfv-options {
    padding: 1rem;
    display: grid;
    width: 100%;
    border-radius: 0 0 2rem 2rem;
    grid-template-columns: 1fr 0.7fr;
    gap: 1rem;
    background-color: #fff;
    border: 0.5rem #fe5d41 solid;
    border-top: none;

    > div {
      &:last-of-type {
        display: flex;
        flex-direction: column;
        padding: 1rem 0 1rem;
        align-items: center;
        gap: 1rem;
        > div {
          &:last-of-type {
            display: flex;
            width: 100%;
            align-items: center;
            gap: 1rem;
            flex-direction: column;
          }
        }
      }
    }
  }

  .sfv-groups {
    padding: 1rem;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    .sfv-viewer {
      height: 100%;
      min-width: 0%;
      display: flex;
      flex-direction: column;
      .sfv-viewer-results {
        display: flex;
        height: 20rem;
        .menu-ia-results {
          box-shadow: none;
        }
        .menu-ia-buttons {
          display: none;
        }
        > div {
          padding-right: 0.5rem;
          position: static;
          flex-grow: 1;
        }
      }
    }

    .sfv-viewer-loading {
      display: flex;
      align-items: center;
      border-radius: 2rem 0 0 0;
      min-width: 52rem;
      min-height: 35rem;
    }

    .sfv-options {
      height: 55rem;
      width: 50rem;
      border: 0.5rem #fe5d41 solid;
      border-radius: 0 2rem 2rem 0;
      border-left: none;
      display: flex;
      flex-direction: column;
      > div {
        &:last-of-type {
          display: flex;
          flex-direction: column;
          padding: 1rem 0 1rem;
          align-items: center;
          gap: 1rem;
          > div {
            &:last-of-type {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
              gap: 1rem;
              button {
                &:first-of-type {
                  display: none;
                }
                width: 20rem;
              }
            }
          }
        }
      }
    }
  }
`;
