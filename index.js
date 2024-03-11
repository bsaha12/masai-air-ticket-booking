const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { apiRouter } = require("./routes/api.Routes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// all the /api routes
app.use("/api" , apiRouter ) ;

// If page doesn't exist
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Oops! Page Not Found" });
});

//start server
app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected To DB");
    console.log("Server Started");
  } catch (error) {
    console.log(error);
  }
});
