import { styled } from "styled-components";

export const StyledCheckbox = styled.div`

    label{
        display: flex;
        align-items: center;
    }

  .checkbox-container {
    flex-basis: 3rem;
    width: 3rem;
    height: 3rem;
    border: 0.3rem solid #ffbe0a;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
    outline: none;
    cursor: pointer;
    //clip-path: circle(20%);
    //transition: clip-path 1s ease-in-out;
  }

  input:checked {
    background-color: #ffbe0a;
    position: relative;
    //clip-path: circle(100%);
    //transition: clip-path 1s ease-in-out;
  }

`;
