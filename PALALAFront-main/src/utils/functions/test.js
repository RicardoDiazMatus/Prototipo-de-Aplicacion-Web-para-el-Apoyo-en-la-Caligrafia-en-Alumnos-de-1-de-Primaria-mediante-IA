import { useEffect, useState } from "react";
import { API_BASE_URL, MUESTRA_DOC_URL } from "../config";
import { useSelector } from "react-redux";

const funcs = require("./functions");

// data=[{}]
export default function Test() {
  const [wordURL, setWordURL] = useState();
  const state = useSelector((appState) => appState);
  useEffect(() => {
    const fetchWordFile = async () => {
      try {
        const requestURL = `${API_BASE_URL}${MUESTRA_DOC_URL}`;
        const response = await fetch(requestURL, {
          method: "POST",
          headers: {
            Authorization: state.authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_archivo: 1,
          }),
        });
        if (response.ok) {
          const blobWord = await response.blob();
          const urlWord = window.URL.createObjectURL(blobWord);
          setWordURL(urlWord);
        } else {
          console.log("Error sending form data: ", response.status);
          const responseData = await response.json();
          console.log("Server says: " + responseData.message);
        }
      } catch (error) {
        console.log("Error while sending data");
        console.log(error);
      }
    };
    fetchWordFile();
  }, []);
}
