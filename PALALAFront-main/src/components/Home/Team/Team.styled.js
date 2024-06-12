import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledTeam = styled(motion.div)`
  min-height: 90rem;
  display: flex;
  flex-direction: column;

  align-items: center;
  background-color: #ffbe0a;
  h1 {
    margin-top: 2rem;
    color: #ffffff;
  }
  h2 {
    text-align: center;
  }

  .members {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10rem;
    width: 100%;
  }
  
.team-members{
    flex-grow: 1;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
}
  .members-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    
    gap: 2rem;
  }

  @media (min-width: 768px) {
    
    .team-members{
        width: 90%;
    }
    .members-container{
        gap: 10rem;
    }
    .student-members {
      .members {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .principal-members{
        .members{
            grid-template-columns: repeat(2, 1fr);
        }
    }
  }
`;
