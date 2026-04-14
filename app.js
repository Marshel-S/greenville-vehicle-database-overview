const { PrismaClient } = require("@prisma/client");
const express = require("express");
const path = require("path");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "homepage.html"));
});

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

app.get("/details", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "details.html"));
});

app.get("/api/vehicles", async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  res.json(vehicles);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});