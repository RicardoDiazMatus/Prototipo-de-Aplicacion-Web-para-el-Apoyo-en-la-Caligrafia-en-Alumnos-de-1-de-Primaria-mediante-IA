import React from "react";
import { StyledServiceCard } from "./ServiceCard.styled";
import ButtonNavigation from "../../../Utils/ButtonNavigation/ButtonNavigation";

function ServiceCard({ title, description, features, link, linkLabel }) {
  return (
    <StyledServiceCard>
      <div className="service-card-titles">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="service-card-bullets">
        {features.map((feature) => (
          <div className="service-card-features">
            <div className="service-card-bullet"></div>
            <p>{feature}</p>
          </div>
        ))}
      </div>
      {link && (
        <div className="service-card-button">
          <ButtonNavigation label={linkLabel} color="#FE5D41" href={link} />
        </div>
      )}
    </StyledServiceCard>
  );
}

export default ServiceCard;
