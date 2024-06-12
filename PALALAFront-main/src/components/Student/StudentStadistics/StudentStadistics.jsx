import React, { useEffect, useState } from "react";
import { StyledStudentStadistics } from "./StudentStadistics.styled";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LastFile from "./LastFilesStadistics/LastFiles";
import Loading from "../../Utils/Loading/Loading";
import { API_BASE_URL, PROGRESO_PERSONAL_URL } from "../../../utils/config";
import { useSelector } from "react-redux";
import { useGetAuthPayload } from "../../../utils/hooks/hooks";
import NoData from "../../Utils/NoData/NoData";

const data = [
  {
    name: "Page A",
    punctuation: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    punctuation: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    punctuation: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    punctuation: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    punctuation: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    punctuation: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    punctuation: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function StudentStadistics() {
  const [chartData, setChartData] = useState(null);
  const [comments, setComments] = useState(null);
  const authPayload = useGetAuthPayload();
  const state = useSelector((appState) => appState);
  useEffect(() => {
    const fetchStadisticsData = async () => {
      try {
        const requestURL = `${API_BASE_URL}${PROGRESO_PERSONAL_URL}`;
        const response = await fetch(requestURL, {
          method: "GET",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          //console.log(responseData.estadisticas.grafica);
          //console.log(responseData.estadisticas.comentario);
          //setChartData(responseData.estadisticas.grafica);
          setChartData(responseData.estadisticas.grafica);
          setComments(responseData.estadisticas.comentario);
        } else {
          const responseData = await response.json();
          console.log(responseData);
          console.log("Error del Servidor");
        }
      } catch (error) {
        console.log(error);
        console.log("Error al enviar al servidor");
        
      }
    };
    fetchStadisticsData();
  }, []);

  return (
    <StyledStudentStadistics>
      <motion.div className="student-stadistics-title">
        <AnimatePresence>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <h2>Tus Estadísticas</h2>
            <p>Estas son tus estadísticas</p>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <lord-icon
              src="https://cdn.lordicon.com/eodavnff.json"
              trigger="loop"
              stroke="light"
              delay="1000"
              style={{ width: "10rem", height: "8rem" }}
            ></lord-icon>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="student-stadistics-options"
        style={{ width: "100%", height: "100%" }}
      >
        <motion.div className="student-charts">
          {chartData === null ? (
            <Loading
              loadingInfo={"Cargando tus datos"}
              iconheight="15rem"
              iconwidth="15rem"
            />
          ) : chartData.length === 0 ? (
            <NoData label={"No hay datos para tu gráfica"} height="100%" widthimg="39%" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={500} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis  />
                <Tooltip />
                <Legend />
                <Line
                  type="linear"
                  dataKey="punctuation"
                  stroke="#ffbe0a"
                  dot={{r: 4, fill: "#ffbe0a"}}
                  activeDot={{ r: 8 }}
                />
                {
                  //<Line type="monotone" dataKey="punctuation" stroke="#82ca9d" />
                }
              </LineChart >
            </ResponsiveContainer>
          )}
        </motion.div>

        <LastFile filesArray={chartData} commentsArray={comments} />
      </motion.div>
    </StyledStudentStadistics>
  );
}

export default StudentStadistics;
