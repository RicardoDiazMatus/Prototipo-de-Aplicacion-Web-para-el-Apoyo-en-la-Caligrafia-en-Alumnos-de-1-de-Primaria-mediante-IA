import { styled } from "styled-components";

export const StyledRegisterFormWrapper = styled.div`
  height: 15rem;
  background-color: #ffbe0a;
  display: flex;
  justify-content: space-between;
  font-size: 3rem;

  .icon {
    margin: 2rem 0 0 2rem;

    &:hover {
      cursor: pointer;
    }
  }
  div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }

  @media (min-width: 768px) {
    height: 100vh;
    width: 50%;
    flex-direction: column;
    align-items: center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
      > div {
        width: 100%;
        height: 80rem;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    img {
      max-width: 100%;
      max-height: 100%;
      width: auto; /* Ensure the image maintains its aspect ratio */
      height: auto; /* Ensure the image maintains its aspect ratio */
    }

    .icon {
      align-self: flex-start;
    }
  }
`;
