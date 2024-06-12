import { styled } from "styled-components";

export const StyledUpload = styled.form`
    margin-top: 1rem;
    a{
        text-decoration: none;
    }
    label{
        height: 4rem;
        display: flex;
        width: 30.2rem;
        justify-content: space-between;
        cursor: pointer;

        div:first-of-type{
            display: flex;
            flex: 1 0 auto;
            justify-content: start;
            align-items: center;
            padding-left: 1rem;
            font-size: 1rem;
            color: #a8a8a8;
            font-weight: bold;
            border: 0.2rem dashed #a8a8a8;
            border-right: none;
            border-radius: 1rem 0 0 1rem;
            transition: background-color 0.3s ease-in-out;
            &:hover{
                background-color: #f0ecec;
            }
        }

        div:last-of-type{
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            background-color: #ffbe0a;
            color: #ffffff;
            border-radius: 0 1rem 1rem 0;
            width: 8rem;
            transition: background-color 0.3s ease-in-out;
            &:hover{
                background-color: #e0a600;
            }
        }
    }

    input[type=file]{
        display: none;
    }
`;