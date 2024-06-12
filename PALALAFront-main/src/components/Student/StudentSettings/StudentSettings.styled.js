import { styled } from "styled-components";

export const StyledStudentSettings = styled.div`
  width: 90%;
  margin: 2rem auto;
  .student-settings-title {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      flex-direction: column;
      &:last-child {
        width: 10rem;
        img {
          max-height: 100%;
          max-width: 100%;
        }
      }
    }
  }

  > div:last-child{
    margin-top: 2rem;
  }
`;
