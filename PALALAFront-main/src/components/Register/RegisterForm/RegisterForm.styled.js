import { styled } from "styled-components";

export const StyledRegisterForm = styled.div`
  width: 80%;
  margin: 2rem auto 0 auto;
  .register-input-name{
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    & > input{
      margin-top: 0.2rem;
      border: none;
      border-bottom: 0.3rem solid #AAAAAA;
      padding: 1rem 0;
    }
  }

  .register-input-icons{
    margin-top: 0.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    h3, h2{
      text-align: left;
    }

    &:last-of-type{
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  .register-input{
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .register-input-field{
      flex-basis: 90%;
      border: none;
      border-bottom: 0.3rem solid #AAAAAA;
      padding: 1rem 0;
    }
    .register-icon{
      flex-basis: 10%;
      border-bottom: 0.3rem solid #AAAAAA;
      padding: 1.2rem 0;
    }
  }

  @media (min-width: 768px) {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;