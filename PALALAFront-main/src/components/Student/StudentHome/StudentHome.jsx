import { faLightbulb, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { StyledStudentHome } from "./StudentHome.styled";
import TextCarousel from "../../Utils/WordCarousel/TextCarousel";
import ButtonNavigation from "../../Utils/ButtonNavigation/ButtonNavigation";
import CardNavigation from "./CardNavigation/CardNavigation";
import StudentMenuSlider from "./StudentMenuSlider/StudentMenuSlider";
import { Link } from "react-router-dom";
import { useGetAuthPayload } from "../../../utils/hooks/hooks";
function StudentHome() {
  const authPayload = useGetAuthPayload();
  return (
    <StyledStudentHome>
      <div className="student-home-title">
        <div>
          <h2>
            ¡Hola{" "}
            Alumno!
          </h2>
          <p>Bienvenido a tu espacio</p>
        </div>
        <div>
          <div className="lightbulb-icon">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>
        </div>
      </div>

      <div className="student-home-hero">
        <TextCarousel
          color={"#000000"}
          words={[
            <div className="student-home-hero-element">
              <div>
                <div className="student-home-hero-title">
                  <h3>Inteligencia</h3>
                  <h3>Artificial PALALA</h3>
                </div>
                <div>
                  <ButtonNavigation
                    label={"Visitar"}
                    styles={{
                      backgroundColor: "#FFF8EA",
                      hoverBackgroundColor: "#FFBE0A",
                      color: "#FFBE0A",
                      hoverColor: "#FFF8EA",
                      borderRadius: "1rem",
                      border: "#FFF8EA solid 0.1rem",
                    }}
                  />
                </div>
              </div>
              <div className="student-home-hero-img">
                <lord-icon
                src="https://cdn.lordicon.com/ckatldkn.json"
                trigger="loop"
                delay="3000"
                colors="primary:#646e78,secondary:#e8e230,tertiary:#ebe6ef"
                style={{ width: "10rem", height: "10rem" }}
              ></lord-icon>
              </div>
            </div>,
            <div className="student-home-hero-element">
              <div>
                <div className="student-home-hero-title">
                  <h3>Mis</h3>
                  <h3>Archivos</h3>
                </div>
                <div>
                  <ButtonNavigation
                    label={"Visitar"}
                    styles={{
                      backgroundColor: "#FFF8EA",
                      hoverBackgroundColor: "#FFBE0A",
                      color: "#FFBE0A",
                      hoverColor: "#FFF8EA",
                      borderRadius: "1rem",
                      border: "#FFF8EA solid 0.1rem",
                    }}
                  />
                </div>
              </div>
              <div className="student-home-hero-img">
                <lord-icon
                src="https://cdn.lordicon.com/ckatldkn.json"
                trigger="loop"
                delay="3000"
                colors="primary:#646e78,secondary:#e8e230,tertiary:#ebe6ef"
                style={{ width: "10rem", height: "10rem" }}
              ></lord-icon>
              </div>
            </div>,
            <div className="student-home-hero-element">
              <div>
                <div className="student-home-hero-title">
                  <h3>Mi</h3>
                  <h3>Progreso</h3>
                </div>
                <div>
                  <ButtonNavigation
                    label={"Visitar"}
                    styles={{
                      backgroundColor: "#FFF8EA",
                      hoverBackgroundColor: "#FFBE0A",
                      color: "#FFBE0A",
                      hoverColor: "#FFF8EA",
                      borderRadius: "1rem",
                      border: "#FFF8EA solid 0.1rem",
                    }}
                  />
                </div>
              </div>
              ,
              <div className="student-home-hero-img">
                <lord-icon
                src="https://cdn.lordicon.com/ckatldkn.json"
                trigger="loop"
                delay="3000"
                colors="primary:#646e78,secondary:#e8e230,tertiary:#ebe6ef"
                style={{ width: "10rem", height: "10rem" }}
              ></lord-icon>
              </div>
            </div>,
            <div className="student-home-hero-element">
              <div>
                <div className="student-home-hero-title">
                  <h3>Configuración</h3>
                </div>
                <div>
                  <ButtonNavigation
                    label={"Visitar"}
                    styles={{
                      backgroundColor: "#FFF8EA",
                      hoverBackgroundColor: "#FFBE0A",
                      color: "#FFBE0A",
                      hoverColor: "#FFF8EA",
                      borderRadius: "1rem",
                      border: "#FFF8EA solid 0.1rem",
                    }}
                  />
                </div>
              </div>
              ,
              <div className="student-home-hero-img">
                <lord-icon
                src="https://cdn.lordicon.com/ckatldkn.json"
                trigger="loop"
                delay="3000"
                colors="primary:#646e78,secondary:#e8e230,tertiary:#ebe6ef"
                style={{ width: "10rem", height: "10rem" }}
              ></lord-icon>
              </div>
            </div>,
            <div className="student-home-hero-element">
              <div>
                <div className="student-home-hero-title">
                  <h3>Plantilla</h3>
                </div>
                <div>
                  <ButtonNavigation
                    label={"Descargar"}
                    styles={{
                      backgroundColor: "#FFF8EA",
                      hoverBackgroundColor: "#FFBE0A",
                      color: "#FFBE0A",
                      hoverColor: "#FFF8EA",
                      borderRadius: "1rem",
                      border: "#FFF8EA solid 0.1rem",
                    }}
                  />
                </div>
              </div>
              ,
              <div className="student-home-hero-img">
                <lord-icon
                src="https://cdn.lordicon.com/ckatldkn.json"
                trigger="loop"
                delay="3000"
                colors="primary:#646e78,secondary:#e8e230,tertiary:#ebe6ef"
                style={{ width: "10rem", height: "10rem" }}
              ></lord-icon>
              </div>
            </div>,
          ]}
          direction={"horizontal"}
          delay={5000}
        />
      </div>
      {/*<div className="interactive-home">
        <StudentMenuSlider isSlidable={true} />
        </div>*/}

      <div className="menu-home">
        <Link to={"/Student/Calligraphy"}>
          <CardNavigation
            label={"IA PALALA"}
            img={
              <lord-icon
                src="https://cdn.lordicon.com/pvucrfqe.json"
                trigger="loop"
                delay="3000"
                colors="primary:#fe5d41,secondary:#ffbe0a"
                style={{ width: "20rem", height: "10rem" }}
              ></lord-icon>
            }
            imgRoute={"https://picsum.photos/id/237/300/300"}
            backgroundColor={"#FFE0DB"}
            imgBackgroundColor={"#FE5D41"}
          />
        </Link>
        <Link to={"/Student/Files"}>
          <CardNavigation
            label={"Mis Archivos"}
            img={
              <lord-icon
                src="https://cdn.lordicon.com/ckatldkn.json"
                trigger="loop"
                delay="3000"
                colors="primary:#646e78,secondary:#e8e230,tertiary:#ebe6ef"
                style={{ width: "20rem", height: "10rem" }}
              ></lord-icon>
            }
            backgroundColor={"#EEEAFF"}
            imgBackgroundColor={"#917BFF"}
          />
        </Link>
        <Link to={"/Student/Settings"}>
          <CardNavigation
            label={"Configuración"}
            img={
              <lord-icon
                src="https://cdn.lordicon.com/nnbhwnej.json"
                trigger="loop"
                delay="3000"
                colors="primary:#e8e230"
                style={{ width: "20rem", height: "10rem" }}
              ></lord-icon>
            }
            backgroundColor={"#E7F7D3"}
            imgBackgroundColor={"#A3EC49"}
          />
        </Link>
        <Link to={"/Student/Stadistics"}>
          <CardNavigation
            label={"Mi Progreso"}
            img={
              <lord-icon
                src="https://cdn.lordicon.com/eodavnff.json"
                trigger="loop"
                stroke="light"
                delay="3000"
                style={{ width: "20rem", height: "10rem" }}
              ></lord-icon>
            }
            backgroundColor={"#FFF8EA"}
            imgBackgroundColor={"#FFBE0A"}
          />
        </Link>
      </div>
    </StyledStudentHome>
  );
}

export default StudentHome;
