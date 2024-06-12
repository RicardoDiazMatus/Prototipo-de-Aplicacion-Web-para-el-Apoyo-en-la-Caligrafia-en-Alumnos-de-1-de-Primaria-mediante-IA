import { styled } from "styled-components";

export const StyledLoginForm = styled.form`
  width: 80%;
  margin: 0 auto;
  height: calc(100vh - 25.5rem);
  display: flex;
  flex-direction: column;

  h1 {
    text-transform: uppercase;
    border-bottom: 0.3rem solid #000000;
  }

  p {
    margin-top: 0.5rem;
    color: #0061ff;
    font-size: 1rem;
  }

  a {
    text-decoration: underline;
    font-size: 1rem;
    &:hover {
      cursor: pointer;
    }
  }

  .login-input-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;

    &:first-of-type {
      justify-content: left;
    }
  }

  .login-input-field {
    color: #aaaaaa;
    border: none;
    border-bottom: 0.3rem solid #aaaaaa;
    width: 80%;
    font-size: 1.4rem;
    padding: 1rem 0rem;
  }

  .login-icon {
    color: #aaaaaa;
    border-bottom: 0.3rem solid #aaaaaa;
    width: 20%;
    font-size: 1.4rem;
    padding: 1.2rem 0rem;
  }

  @media (min-width: 768px) {
    width: 40%;
    justify-content: center;
    height: 100vh;
    p {
      font-size: 1.5rem;
    }

    a {
      font-size: 1.5rem;
    }
  }
`;
