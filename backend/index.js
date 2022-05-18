const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const inputRoute = require("./src/Routes/inputRoutes");

const app = express();

//----------Middleware-----------------------
app.use(express.json());
app.use(cors());

//-----------Routes--------------------------
app.use("/input", inputRoute);

//-------------Database Connect----------------
const db = process.env.DB_URL;

mongoose.connect(db).then(() => {
  console.log("DB connected");
});

const PORT = process.env.PORT || 9999;

//---------Server start running in local port-----
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
