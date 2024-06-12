import React, { useEffect, useState } from "react";
import RegisterSelection from "../components/Register/RegisterSelection/RegisterSelection";
import RegisterForm from "../components/Register/RegisterForm/RegisterForm";
import RegisterFormWrapper from "../components/Register/RegisterForm/RegisterFormWrapper";
import { styled } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAuthPayload } from "../utils/hooks/hooks";
import { useNavigate } from "react-router-dom";

const StyledRegister = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;

const StyledMotionRegisterForm = styled(motion.div)`
  width: 100%;
  @media (min-width: 768px) {
    display: flex;
  }
`;

function Register() {
  const [userValue, setUserValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const authPayload = useGetAuthPayload();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authPayload is falsy, then redirect to "/"
    if (authPayload) {
      navigate("/");
    }
  }, [authPayload, navigate]);

  const updateUserValue = (newValue) => {
    setUserValue(newValue);
  };

  const updateCurrentPage = (newValue) => {
    setCurrentPage(newValue);
  };

  return (
    <StyledRegister>
      <AnimatePresence>
        {currentPage === 1 ? (
          <RegisterSelection
            updateUserValue={updateUserValue}
            updateCurrentPage={updateCurrentPage}
          />
        ) : (
          <StyledMotionRegisterForm
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RegisterFormWrapper
              updateCurrentPage={() => updateCurrentPage(1)}
            />
            <RegisterForm userSelection={userValue} />
          </StyledMotionRegisterForm>
        )}
      </AnimatePresence>
      {/*<RegisterFormWrapper />
            <RegisterForm />
            */}
    </StyledRegister>
  );
}
export default Register;
