import React from "react";
import { StyledProfessorSettings } from "./ProfessorSettings.styled";
import { motion } from "framer-motion";
import NavigationCarousel from "../../Utils/NavigationCarousel/NavigationCarousel";
import ProfileProfessorSettings from "./ProfileProfessorSettings/ProfileProfessorSettings";
import GroupProfessorSettings from "./GroupProfessorSettings/GroupProfessorSettings";
function ProfessorSetting() {
  const inputVariants = {
    visible: { borderWidth: "0.2rem" },
    hidden: {
      borderWidth: "0rem",
    },
  };

  const navElements = [
    {
      headerElement: "Perfil",
      bodyElement: <ProfileProfessorSettings />,
    },
    {
      headerElement: "Grupos",
      bodyElement: <GroupProfessorSettings />,
    },
  ];

  return (
    <StyledProfessorSettings>
      <NavigationCarousel elements={navElements} />
    </StyledProfessorSettings>
  );
}
export default ProfessorSetting;
