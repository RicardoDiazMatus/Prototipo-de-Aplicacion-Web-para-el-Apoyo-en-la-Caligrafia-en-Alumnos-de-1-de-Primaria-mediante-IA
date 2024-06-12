import { styled } from "styled-components";

export const StyledStudentFiles = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 2rem auto;
  .student-files-title {
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
  .student-files-list {
    display: grid;
    //grid-template-columns: repeat(1, 1fr);
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    margin-top: 3rem;
    row-gap: 3rem;
  }
  .student-loading-files {
    height: 45rem;
    margin-top: 2rem;
  }

  @media (min-width: 720px) {
    .student-loading-files {
      height: 65rem;
    }
  }
`;
