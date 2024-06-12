import React from "react";
import { StyledStudentSettings } from "./StudentSettings.styled";
import NavigationCarousel from "../../Utils/NavigationCarousel/NavigationCarousel";
import GroupProfessorSettings from "../../Professors/ProfessorSettings/GroupProfessorSettings/GroupProfessorSettings";
import ProfileStudentSettings from "./ProfileStudentSettings/ProfileStudentSettings";
import GroupStudentSettings from "./GroupStudentSettings/GroupStudentSettings";
import { AnimatePresence, motion } from "framer-motion";
function StudentSettings() {
  const navElements = [
    {
      headerElement: "Perfil",
      bodyElement: <ProfileStudentSettings />,
    },
    {
      headerElement: "Grupos",
      bodyElement: <GroupStudentSettings />,
    },
  ];

  return (
    <StyledStudentSettings>
      <div className="student-settings-title">
        <AnimatePresence>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <h2>Configuración</h2>
            <p>Estos son tus datos</p>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <lord-icon
              src="https://cdn.lordicon.com/nnbhwnej.json"
              trigger="loop"
              delay="5000"
              colors="primary:#e8e230"
              style={{ width: "10rem", height: "8rem" }}
            ></lord-icon>
          </motion.div>
        </AnimatePresence>
      </div>
      <div>
        <NavigationCarousel
          elements={navElements}
          headerspace={"space-around"}
        />
      </div>
    </StyledStudentSettings>
  );
}

export default StudentSettings;
