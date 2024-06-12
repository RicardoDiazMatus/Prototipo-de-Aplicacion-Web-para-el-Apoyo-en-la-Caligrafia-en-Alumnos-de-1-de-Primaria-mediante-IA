import React, { useEffect } from "react";
import LogoWrapper from "../components/Login/LogoWrapper/LogoWrapper";
import LoginForm from "../components/Login/LoginForm/LoginForm";
import { styled } from "styled-components";
import { useGetAuthPayload } from "../utils/hooks/hooks";
import { useNavigate } from "react-router-dom";

const StyledLogin = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;

function Login() {
  const authPayload = useGetAuthPayload();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authPayload is falsy, then redirect to "/"
    if (authPayload) {
      navigate("/");
    }
  }, [authPayload, navigate]);

  return (
    <StyledLogin>
      <LogoWrapper />
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
