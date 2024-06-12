import { styled } from "styled-components";

export const StyledEditModal = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 5rem 2rem;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    display: flex;
    justify-content: center;
    text-align: center;
    &:first-child {
      color: #fe5d41;
      font-size: 5rem;
      font-weight: bold;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7rem;
        height: 7rem;
        border: #fe5d41 solid 0.5rem;
        border-radius: 100%;
      }
    }

    &:last-child{
        display: flex;
        justify-content: space-around;
    }
  }
`;