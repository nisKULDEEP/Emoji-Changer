const express = require("express");
const { allData, upload } = require("../Controller/inputController");

const app = express();

//Routes
app.get("/alldata", allData);
app.post("/upload", upload);

module.exports = app;
