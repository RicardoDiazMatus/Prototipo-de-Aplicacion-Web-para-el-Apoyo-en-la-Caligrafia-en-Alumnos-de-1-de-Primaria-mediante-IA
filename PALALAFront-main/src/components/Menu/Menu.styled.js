import { styled } from "styled-components";

export const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #FE5D41;
    height: calc(100vh - 5.3rem);
    text-align: left;
    width: 30rem;
    -webkit-box-shadow: 13px 0px 24px -19px rgba(0,0,0,0.3);
    -moz-box-shadow: 13px 0px 24px -19px rgba(0,0,0,0.3);
    box-shadow: 13px 0px 24px -19px rgba(0,0,0,0.3);
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    div {
        display: flex;
        flex-direction: column;
        text-align: left;
        &:last-child{
            border-top: #FFFFFF solid 0.3rem;
        }
    }

    a {
        display: block;
        font-size: 1.6rem;
        text-transform: uppercase;
        padding: 2rem;
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: #FFFFFF;
        text-decoration: none;
        transition: color 0.3s linear;
        &:hover{
            color: #000000;
            background-color: #FFBE0A;
        }
    }



`