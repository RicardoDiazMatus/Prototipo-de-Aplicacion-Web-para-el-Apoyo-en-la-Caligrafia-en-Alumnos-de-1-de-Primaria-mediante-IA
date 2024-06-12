import { styled } from "styled-components";

export const StyledProfileStudentSettings = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .profile-setting-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-self: center;
    background-color: #ffffff;
    border-radius: 3rem;
    margin: 2rem 0 0 0;
    padding: 2rem;
    width: 100%;
    -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 1);
  }
  .profile-setting-header {
    display: flex;
    justify-content: space-between;
    flex-basis: 10%;
  }

  .profile-setting-body {
    display: flex;
    flex-direction: column;
    flex-basis: 60%;
  }

  .profile-setting-input {
    justify-content: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 1rem 0;
    position: relative;
    label {
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 0.2rem;
    }
    input {
      appearance: none;
      border-style: none;
      height: 3rem;
      font-size: 1.2rem;
      //-webkit-box-shadow: inset 0px 0px 10px -5px rgba(0, 0, 0, 0.5);
      //-moz-box-shadow: inset 0px 0px 10px -5px rgba(0, 0, 0, 0.5);
      &:focus {
        outline: #ffbe0a solid 0.1rem;
      }
    }
  }

  .icon-show-password {
    position: absolute;
    cursor: pointer;
    color: #a8a8a8;
    font-size: 1.5rem;
    align-self: center;
    justify-self: center;
    right: 1rem;
    top: 3.7rem;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #000000;
    }
  }

  .profile-setting-inputs-container {
    display: flex;
    flex-direction: column;
  }

  .profile-setting-buttons {
    margin: 1rem 0;
    div {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }

  .setting-error {
    color: #fe5d41;
  }

  @media (min-width: 768px) {
    width: 100%;
    .profile-setting-container{
      height: 60rem;
    }
    .profile-setting-inputs-container {
      flex-direction: row;
    }
    .icon-show-password {
      top: 4.1rem;
    }
  }
`;
