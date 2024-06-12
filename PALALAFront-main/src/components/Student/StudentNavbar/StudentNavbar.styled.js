import { styled } from "styled-components";

export const StyledStudentNavbar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  
  .student-navbar {
    z-index: 3;
    display: flex;
    width: 100%;
    margin: 0 auto;
    font-size: 2rem;
    height: 6rem;
    align-items: center;
    justify-content: space-between;
    background-color: #ffbe0a;
    padding: 0 2rem;
    > div {
      cursor: pointer;
    }
  }

  .student-container {
    position: relative;
    min-height: calc(100vh - 12rem);
  }

  .bottom-student-navbar {
    padding: 0;
    border-radius: 1rem 1rem 0 0;
    > a {
      &:first-child {
        border-radius: 1rem 0 0 0;
      }
      &:last-child {
        border-radius: 0 1rem 0 0;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: linear-gradient(#ffbe0a, #ffbe0a 50%, #fe5d41 50%, #fe5d41);
      background-size: 100% 200%;
      transition: all 0.3s ease-in-out;
      color: #fe5d41;
      &.selected {
        background-position: 100% 100%;
        color: #ffffff;
      }
      &:hover {
        background-position: 100% 100%;
        color: #ffffff;
      }
    }
  }

  .ia-icon {
    font-size: 2.5rem;
  }

  .sticky-top {
    position: fixed;
    top: 0;
  }

  .sticky-bottom{
    position: fixed;
    bottom: 0;
  }

  @media (min-width: 720px){
    
  }
`;
