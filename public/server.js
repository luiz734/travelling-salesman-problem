const express = require("express");
const path = require("path");
const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const stylesDir = "/css";
const scriptsDir = "/scripts";

const files = {
   index: "/index.html",
   style: "/style.css",
   sketch: "/sketch.js",
   genetic: "/genetic.js",
   ui: "/ui.js",
};

/* ---------------------------------- html ---------------------------------- */
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, files.index));
});
/* ------------------------------- Javascript ------------------------------- */
app.get(files.sketch, (req, res) => {
   res.sendFile(path.join(__dirname, scriptsDir, files.sketch));
});
app.get(files.genetic, (req, res) => {
   res.sendFile(path.join(__dirname, scriptsDir, files.genetic));
});
app.get(files.ui, (req, res) => {
   res.sendFile(path.join(__dirname, scriptsDir, files.ui));
});
/* ----------------------------------- css ---------------------------------- */
app.get(files.style, (req, res) => {
   res.sendFile(path.join(__dirname, stylesDir, files.style));
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
