const express = require("express");
const { allData, upload } = require("../Controller/inputController");

const app = express();

app.get("/alldata", allData);
app.post("/upload", upload);

module.exports = app;
