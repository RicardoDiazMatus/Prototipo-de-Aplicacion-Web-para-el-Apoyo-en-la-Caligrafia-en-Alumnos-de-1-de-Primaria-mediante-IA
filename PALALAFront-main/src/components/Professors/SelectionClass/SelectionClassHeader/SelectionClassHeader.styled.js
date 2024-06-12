import { styled } from "styled-components";

export const StyledSelectionClassHeader = styled.div`
  background-color: #ffbe0a;
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);

  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  h2 {
    font-size: 3.2rem;
  }
  span {
    font-size: 2rem;
    font-weight: bold;
  }

  .filter {
    display: flex;
    width: 20rem;
    align-items: center;
    justify-content: space-around;
  }

  select {
    appearance: none;
    border: 0;
    outline: 0;
    box-shadow: none;
    background-image: none;
    &::-ms-expand {
      display: none;
    }
  }

  .select {
    display: flex;
    width: 15.1rem;
    height: 3rem;
    position: relative;
    border-radius: 0.25rem;
    overflow: hidden;
    font-size: 1.2rem;
    select {
      flex: 1;
      padding: 0 1em;
      color: #000000;
      background-color: #ffffff;
      border-bottom: #FE5D41 solid 0.3rem;
      cursor: pointer;
    }
    &:after{
      content: "▼";
      position: absolute;
      inset-inline-end: 0;
      top: 20%;
      right: 5%;
      padding: 0.2rem;
      background-color: #FFFFFF;
      transition: all 0.25s ease-in-out;
      
      pointer-events: none;
    }
    &:hover::after {
    color: #FE5D41;
  }
  }

  .filter-arrow {
    input {
      display: none;
    }
  }

  .arrow {
    z-index: 1;
    background: #fff;
    height: 3px;
    width: 20px;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    transform: rotate(90deg);

    &:before,
    &:after {
      content: "";
      background: #fff;
      position: absolute;
      height: 3px;
      width: 11px;
    }
  }

  #animation2 {
    & + label > .arrow {
      &:before {
        animation: animation-2-before-reverse 1s ease 0s 1 alternate both;
      }

      &:after {
        animation: animation-2-after-reverse 1s ease 0s 1 alternate both;
      }
    }

    &:checked {
      & + label > .arrow {
        &:before {
          animation: animation-2-before 1s ease 0s 1 alternate both;
        }

        &:after {
          animation: animation-2-after 1s ease 0s 1 alternate both;
        }
      }
    }
  }
  //<-
  @keyframes animation-2-after {
    0% {
      right: -0px;
      top: -4px;
      transform: rotate(45deg);
      background: blue;
    }

    50% {
      width: 3px;
      border-radius: 50%;
      top: 20px;
      left: 15px;
    }

    100% {
      left: -3px;
      top: -3px;
      transform: rotate(135deg);
      height: 3px;
      width: 11px;
      background: #fff;
    }
  }
  @keyframes animation-2-before {
    0% {
      right: -0px;
      bottom: -4px;
      transform: rotate(-45deg);
      background: red;
    }

    50% {
      width: 3px;
      border-radius: 50%;
      bottom: 20px;
      left: 15px;
    }

    100% {
      left: -3px;
      bottom: -3px;
      transform: rotate(-135deg);
      height: 3px;
      width: 11px;
      background: #fff;
    }
  }
  //->
  @keyframes animation-2-after-reverse {
    0% {
      left: -2px;
      bottom: -4px;
      transform: rotate(135deg);
      height: 3px;
      width: 11px;
      background: #fff;
    }

    50% {
      width: 3px;
      border-radius: 50%;
      top: 20px;
      left: 15px;
      background: red;
    }

    100% {
      right: -3px;
      top: -3px;
      transform: rotate(45deg);
      background: #fff;
    }
  }
  @keyframes animation-2-before-reverse {
    0% {
      left: -3px;
      bottom: -4px;
      transform: rotate(-135deg);
      height: 3px;
      width: 11px;
      background: #fff;
    }

    50% {
      width: 3px;
      border-radius: 50%;
      bottom: 20px;
      left: 15px;
      background: blue;
    }

    100% {
      right: -3px;
      bottom: -3px;
      transform: rotate(-45deg);
      background: #fff;
    }
  }

  .group-add {
    cursor: pointer;
    p {
      font-size: 2.4rem;
      color: #ffffff;
    }
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    border-radius: 1rem;
    background-color: #FE5D41;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #DB270D;
    }
  }
`;
