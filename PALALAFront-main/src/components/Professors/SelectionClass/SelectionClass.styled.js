import { styled } from "styled-components";

export const StyledSelectionClass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  .selectionclass-items {
    width: 100%;
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    .selectionclass-items-nofiles {
      background-color: #FFFFFF;
      border-radius: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: center;
      width: 90%;
      margin: 0 auto;
      height: 80%;
      grid-column: 1 / 4;
      > div {
        &:first-child {
          width: 30rem;
          img {
            max-width: 90%;
            max-height: 90%;
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    .selectionclass-items {
      grid-template-columns: repeat(3, 1fr);
      .link-unstyled {
        text-decoration: none;
        color: #000000;
      }
    }
  }
`;
