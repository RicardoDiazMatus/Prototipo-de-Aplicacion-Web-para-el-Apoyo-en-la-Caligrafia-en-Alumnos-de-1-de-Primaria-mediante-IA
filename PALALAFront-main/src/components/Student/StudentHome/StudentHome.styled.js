import { styled } from "styled-components";

export const StyledStudentHome = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  min-height: calc(100vh - 12rem);
  .student-home-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .lightbulb-icon {
      font-size: 2rem;
    }
  }

  .student-home-hero {
    background-color: #ffbe0a;
    flex-grow: 1;
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    .student-home-hero-element {
      display: flex;
      justify-content: space-between;
      height: 10rem;
      width: 27rem;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        &:last-child {
          justify-content: center;
        }
      }

      .student-home-hero-title {
        color: #ffffff;
      }
    }

    .student-home-hero-img {
      width: 10rem;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .interactive-home{
    height: 50rem;
    
  }
  .menu-home {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4rem;
    margin-bottom: 4rem;
    a{
      text-decoration: none;
    }
  }

  @media (min-width: 720px){
    .menu-home{
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2rem;
    }
  }
`;
