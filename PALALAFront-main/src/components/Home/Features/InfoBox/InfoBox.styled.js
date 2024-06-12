import { styled } from "styled-components";

export const StyledInfoBox = styled.div`
    display: flex;
    justify-content: center;
    div{
        flex-basis: calc(50% - 3rem);
    }

    h3{
        padding-bottom: 1rem;
    }

    p{
        font-size: 1.4rem;
    }

    @media (min-width: 768px){
        flex-direction: column;
        margin: 0 auto;
        text-align: center;
    }
`;