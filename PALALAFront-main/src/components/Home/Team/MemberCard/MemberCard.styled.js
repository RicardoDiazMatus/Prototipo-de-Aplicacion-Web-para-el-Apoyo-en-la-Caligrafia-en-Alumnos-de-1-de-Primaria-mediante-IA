import { motion } from "framer-motion";
import { styled } from "styled-components";

export const StyledMemberCard = styled(motion.div)`
    flex-basis: calc(30% - 2rem);
    .member-card-image{
        img{
            max-width: 100%;
            max-height: 100%;
            height: 14rem;
            width: 14rem;
            display: block;
            margin: 0 auto;
            border-radius: 100%;
        }
    }
    .member-card-info{
        margin-top: 0.5rem;
        *{
            padding: 0.2rem;
        }
        p{
            font-size: 1.4rem;
        }
    }
    text-align: center;
`;