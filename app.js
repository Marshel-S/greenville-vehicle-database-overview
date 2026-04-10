const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage.html"));
});

app.get("/vehicle", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "database.html"));
});

app.get("/maps", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "maps.html"));
});

app.get("/job", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "jobs.html"));
});

app.get("/wiki", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wiki.html"));
});

app.listen(3000, () => {
  console.log('Express server running on http://localhost:3000');
});
