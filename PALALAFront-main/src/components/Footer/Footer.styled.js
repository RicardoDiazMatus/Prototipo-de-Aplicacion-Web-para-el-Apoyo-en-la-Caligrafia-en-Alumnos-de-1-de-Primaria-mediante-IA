import { styled } from "styled-components";

export const StyledFooter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    h2{
        text-align: center;
        margin-top: 2rem;
    }

    a{
        color: #CCCCCC;
        font-size: 1.4rem;
        text-decoration: none;
        margin-top: 1rem;
        transition: color 0.3s ease-in-out;
        &:hover{
            color: #A8A8A8;
        }
    }
    div{
        margin-left: 6rem;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        &:last-of-type{
            color: #A8A8A8;
            margin: 4rem 0 4rem 0
        }
    }
    

`;