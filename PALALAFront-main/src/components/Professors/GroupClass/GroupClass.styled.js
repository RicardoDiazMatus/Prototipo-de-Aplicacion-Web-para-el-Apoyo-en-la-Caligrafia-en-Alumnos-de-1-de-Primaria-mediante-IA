import { styled } from "styled-components";

export const StyledGroupClass = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .groupclass-items {
    flex-grow: 1;
    display: grid;
    //grid-template-columns: repeat(1, 1fr);
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    margin-top: 3rem;
    row-gap: 3rem;
  }
`;
