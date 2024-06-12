import { styled } from "styled-components";

export const StyledClassCardFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  margin: 0 auto;
  align-items: center;
  .cardfile-container {
    height: 30rem;
    width: 30rem;
    display: flex;
    flex-direction: column;
    background-color: #f8f4f4;
    align-items: center;
    transition: all 0.3s ease-in-out;
    .file-preview {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cardfile-info {
      display: flex;
      width: 90%;
      color: #a19f9e;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-start;
      div {
        margin-top: 0rem;
        padding-right: 0.5rem;
        > * {
          padding-right: 0.5rem;
        }
      }
    }

    &:hover {
      -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
      .file-preview {
        .file-preview-button {
          width: 100%;

          opacity: 100%;

          transition: all 0.3s ease-in-out;
        }
      }
    }
  }

  .file-preview {
    width: 80%;
    margin: 2rem 2rem 1rem 2rem;
    position: relative;
    .file-preview-button {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      opacity: 0;
      position: absolute;
      top: 40%;
      left: 0%;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .cardfile-info {
    color: #71a6bb;
    display: flex;
    font-size: 1.5rem;
    width: 30rem;
    justify-content: space-around;
    .cardfile-info-text {
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        margin-top: 1rem;
      }
    }
    .file-preview-button {
      display: flex;
      max-width: 100%;
      flex-grow: 1;
      justify-content: space-around;
      align-items: center;
    }

    p {
      font-size: 1.5rem;
    }
    div {
      display: flex;
      > * {
        padding-right: 1rem;
      }
    }
  }

  @media (min-width: 720px) {
    .cardfile-container {
      width: 25rem;
      height: 25rem;
    }
    .cardfile-info {
      width: 25rem;
      .cardfile-info-text {
        width: 100%;
      }
      .file-preview-button {
        display: none;
      }
    }
  }
`;
