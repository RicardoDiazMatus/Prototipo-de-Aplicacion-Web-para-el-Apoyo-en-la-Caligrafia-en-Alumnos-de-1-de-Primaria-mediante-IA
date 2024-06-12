import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledRegisterSelection = styled(motion.div)`
    height: 100vh;
    width: 100%;
    background-color: #FFBE0A;
    overflow: hidden;
    .register-selection-nav{
        display: flex;
        justify-content: space-between;
        padding: 2rem 2rem;
        font-size: 2rem;
        a{
            color: #000000;
        }
    }

    .register-selecion-carousel{
        margin-top: 5rem;
        background-color: #ffffff;
        border-radius: 3rem;
        height: 39rem;
    }

    .register-selection-button{
        margin-top: 5rem;
        display: flex;
        justify-content: center;
    }

    @media (min-width: 720px){
        .register-selecion-carousel{
            margin: 0 auto;
            width: 50%;
            height: 70rem;
            img{
                
            }
        }
    }
`;