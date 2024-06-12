import { styled } from "styled-components";

export const StyledProfileProfessorSettings = styled.div`
  width: 90%;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .profile-setting-container {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #ffffff;
    border-radius: 3rem;
    margin-top: 3rem;
    padding: 2rem;
    width: 100%;
    height: 50rem;
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
    right: 0.5rem;
    bottom: 0.7rem;
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
    height: 70%;
    width: 70%;
    .profile-setting-inputs-container {
      flex-direction: row;
    }
    .icon-show-password {
      bottom: 1.2rem;
    }
  }
`;
