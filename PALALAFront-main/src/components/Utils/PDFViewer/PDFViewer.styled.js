import { styled } from "styled-components";

export const StyledPDFViewer = styled.div`
  width: 100%;
  height: 100%;
  border: #fe5d41 solid 0.4rem;
  background-color: #fe5d41;
  .pdf-viewer-buttons {
    z-index: 1;
    display: flex;
    justify-content: space-between;
    border-bottom: #fe5d41 solid 0.1rem;
    background-color: #fe5d41;
  }

  .pdf-viewer-doc {
    margin: 0 auto;
    width: 35.08rem;
    height: 24.8rem;
    overflow-y: scroll;
    overflow-x: scroll;
  }

  @media (min-width: 720px) {
    .pdf-viewer-doc {
      width: calc(35.08rem + 3.6rem);
      height: calc(24.8rem + 5.5rem);
    }
  }
`;
