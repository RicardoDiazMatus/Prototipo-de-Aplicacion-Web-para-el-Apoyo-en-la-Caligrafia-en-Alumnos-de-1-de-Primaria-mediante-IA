const express = require("express");
const corsConfig = require("./config/corsConfig");
const fs = require("fs");

const app = express();
const PORT =  process.env.PORT || 9000;
const routes = require("./routes/routes");
const pool = require("./config/dbConfig");

// Your routes will go here
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", routes);
app.use("/images",express.static("routes/ia/uploads/pers/images"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    if (process.env.domain!="http://localhost:8000"){
      //revisar si existe el archivo "flag"
      const flagFile = fs.existsSync("flag");
      if (flagFile) {
        //si existe, borrarlo
        fs.unlinkSync("flag");
        //revisar si existe el archivo "flag"
        const flagFile = fs.existsSync("flag");
        if (flagFile) {
          //si existe, borrarlo
          fs.unlinkSync("flag");
        }
        
        //hacer delete de la tabla archivo
        const query = `DELETE FROM archivo`;
        pool.query(query, (error, results) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Tabla archivo vaciada");
          }
        });
      }
    } 
  }
  catch (error) {
    1;
  }
});

module.exports = app; // Export the app object