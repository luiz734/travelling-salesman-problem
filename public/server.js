const express = require("express");
const fs = requite("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

const HTML_INDEX = "/index.html";
const SCRIPT_SKETCH = "/scripts/sketch.js";
const SCRIPT_GENETIC = "/scripts/genetic.js";
const SCRIPT_UI = "/scripts/ui.js";
const CSS_STYLE = "/css/style.css";

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname + HTML_INDEX));
});

app.get("/sketch.js", (req, res) => {
   res.sendFile(path.join(__dirname + SCRIPT_SKETCH));
});
app.get("/genetic.js", (req, res) => {
   res.sendFile(path.join(__dirname + SCRIPT_GENETIC));
});
app.get("/ui.js", (req, res) => {
   res.sendFile(path.join(__dirname + SCRIPT_UI));
});
app.get("/style.css", (req, res) => {
   res.sendFile(path.join(__dirname + CSS_STYLE));
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
