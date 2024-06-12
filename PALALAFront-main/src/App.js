import logo from "./logo.svg";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import IA from "./pages/IA";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Professor from "./pages/Professor";
import ProtectedRoute from "./components/Utils/ProtectedRoute/ProtectedRoute";
import ForbiddenPage from "./pages/ForbiddenPage";
import ProfessorNavbar from "./components/Professors/ProfessorNavbar/ProfessorNavbar";
import GroupClass from "./components/Professors/GroupClass/GroupClass";
import ProfessorSetting from "./components/Professors/ProfessorSettings/ProfessorSettings";
import StudentNavbar from "./components/Student/StudentNavbar/StudentNavbar";
import StudentHome from "./components/Student/StudentHome/StudentHome";
import StudentSettings from "./components/Student/StudentSettings/StudentSettings";
import StudentFiles from "./components/Student/StudentFiles/StudentFiles";
import Media from "./pages/Media";
import StudentStadistics from "./components/Student/StudentStadistics/StudentStadistics";
import PDFViewer from "./components/Utils/PDFViewer/PDFViewer";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import { useEffect } from "react";
import { API_BASE_URL,GET_STUDENTS_URL} from "./utils/config";
import UserFileViewer from "./components/Utils/UserFileViewer/UserFileViewer";
import NotFoundPage from "./pages/NotFoundPage";
import Test from "./utils/functions/test";

function RenderTest() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestURL = `${API_BASE_URL}${GET_STUDENTS_URL}`;
        const response = await fetch(requestURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.log("Error server");
        }
      } catch (error) {
        console.log("NetworkError not possible to send the fetch resource");
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return null;
}

function App() {
  //Functions

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/Media" element={<Media />} />
          <Route path="/IA" element={<IA />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForbiddenPage" element={<ForbiddenPage />} />

        {/* Protected Routes */}

        <Route
          path="/Professor"
          element={
            <ProtectedRoute
              child={<ProfessorNavbar />}
              requiredRole="profesor"
            />
          }
        >
          <Route index element={<Professor />} />
          <Route path="Class/:classID" element={<GroupClass />} />
          <Route path="Settings" element={<ProfessorSetting />} />
        </Route>

        <Route
          path="/Student"
          element={
            <ProtectedRoute child={<StudentNavbar />} requiredRole="alumno" />
          }
        >
          <Route index element={<StudentHome />} />
          <Route path="Files" element={<StudentFiles />} />
          <Route path="Settings" element={<StudentSettings />} />
          <Route path="Stadistics" element={<StudentStadistics />} />
          <Route path="Calligraphy" element={<IA />} />
        </Route>
        <Route
          path="/Test"
          element={
            <>
              <UserFileViewer />
            </>
          }
        />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;