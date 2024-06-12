import React, { useEffect, useState } from "react";
import { StyledSelectionClassHeader } from "./SelectionClassHeader.styled";
import OverlayModal from "../../../Utils/OverlayModal/OverlayModal";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "styled-components";
import AddClassForm from "../AddClassForm/AddClassForm";
import OkModal from "../../../Utils/OkModal/OkModal";

function SelectionClassHeader({ handleAscDescOption, handleSortingOption, handleAddedClass }) {
  const [isOverflow, setisOverflow] = useState(false);
  const [isGroupAdded, setIsGroupAdded] = useState(false);
  const [modal, setModal] = useState(<></>);

  useEffect(() => {
    if (isGroupAdded) {
      setModal(<OkModal handleNext={handleClose} />);
    } else {
      setModal(<AddClassForm handleCancel={handleClose} />);
    }
  }, [isGroupAdded]);

  const handleGroupAddClicked = () => {
    setModal(
      <AddClassForm
        handleCancel={handleClose}
        handleOperationSuccessful={handleAddClassSuccess}
      />
    );
    setisOverflow(true);
  };

  const handleAddClassSuccess = () => {
    setIsGroupAdded(true);
    handleAddedClass();
  };

  const handleClose = () => {
    setisOverflow(false);
    if (isGroupAdded) {
      setIsGroupAdded(false);
    }
  };

  return (
    <StyledSelectionClassHeader>
      <AnimatePresence>
        {isOverflow && (
          <OverlayModal handleClose={handleClose}>
            <AnimatePresence>{modal}</AnimatePresence>
          </OverlayModal>
        )}
      </AnimatePresence>
      <div>
        <div>
          <h3>Clases</h3>
        </div>
        <div className="filter">
          <div className="filer-select">
            <label className="select">
              <select
                onChange={(event) => handleSortingOption(event.target.value)}
              >
                <option value="name">Nombre</option>
                <option value="students">Estudiantes</option>
                <option value="date">Fecha</option>
              </select>
            </label>
          </div>
          <div className="filter-arrow">
            <input
              type="checkbox"
              id="animation2"
              onChange={(event) => handleAscDescOption(event.target.checked)}
            />
            <label htmlFor="animation2">
              <div className="arrow"></div>
            </label>
          </div>
        </div>
        <div className="group-add" onClick={handleGroupAddClicked}>
          <p>+</p>
        </div>
      </div>
    </StyledSelectionClassHeader>
  );
}

export default SelectionClassHeader;
