require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const indexRoute = require("./routes/index");

// Cors
const corsOptions = {
  origin: "*",
  //   origin: process.env.ALLOWED_CLIENTS.split(","),
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
};

app.use(cors(corsOptions));
app.use(express.static("public"));

const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use("/api", indexRoute);

app.listen(PORT, console.log(`Listening on port ${PORT}.`));
