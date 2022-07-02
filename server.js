const express = require('express')
const fs = require('fs');
const path = require('path')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
})
app.get('/sketch.js', (req, res) => {
  res.sendFile(path.join(__dirname + "/sketch.js"));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
