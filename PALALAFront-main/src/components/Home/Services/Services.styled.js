import { motion } from "framer-motion";

const { styled } = require("styled-components");

export const StyledServices = styled(motion.div)`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    > div{
        margin-top: 1rem;
        width: 100%;
    }

    > *{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .services-title{
        > * {
            margin-top: 1rem;
        }
        p{
            color: #A8A8A8;
        }
    }

    .services-icons{
        width: 100%;
        margin-top: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: #A8A8A8 solid 0.1rem;
        height: 4.5rem;
        > * {
            font-size: 2rem;
            cursor: pointer;
            color: #A8A8A8;
            transition: color 0.3s ease-in-out;
            &:hover{
                color: #FFBE0A;
            }
        }
    }
`;
