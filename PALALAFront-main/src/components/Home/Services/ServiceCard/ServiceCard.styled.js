import { styled } from "styled-components";

export const StyledServiceCard = styled.div`
  display: flex;
  margin:  3rem auto 0 auto;
  border: 0.1rem solid #a8a8a8;
  border-radius: 2rem;
  width: 31.1rem;
  height: 41.6rem;
  padding: 1.5rem;
  flex-direction: column;
  text-align: left;
  -webkit-box-shadow: 0px 10px 5px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 10px 5px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 10px 5px -1px rgba(0, 0, 0, 0.1);
  .service-card-titles {
    flex-basis: calc(20% - 2rem);
    p {
      margin-top: 1rem;
    }
  }

  .service-card-bullets {
    flex-basis: calc(80% - 2rem);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .service-card-features {
    display: flex;
    p {
      font-size: 1.5rem;
    }
  }

  .service-card-bullet {
    margin-left: 1rem;
    margin-right: 1rem;
    background-color: #fe5d41;
    width: 2.6rem ;
    height: 2.6rem;
    border-radius: 100%;
    display: block;
  }

  .service-card-button{    
    display: flex;
    justify-content: end;
  }
`;
