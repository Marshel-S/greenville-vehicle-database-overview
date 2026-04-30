import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import express from "express";
import multer from "multer";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { fileURLToPath } from "url";

const app = express();
const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Greenville Vehicle API Documentation",
      version: "1.0.0",
      description: "API Documentation for Greenville Vehicle Database"
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
      },
    ],
  },
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("public/uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads"));
  }
});

const upload = multer({ storage });

/* ================= PAGE ROUTES ================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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

app.get("/maps-details", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "map-details.html"));
});

app.get("/add-vehicle", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "createvehicle.html"));
});

app.get("/style=Wfnh7Lhqm0pX4", (req, res) => {
  res.type("text/css");
  res.sendFile(path.join(__dirname, "public", "style.css"));
});

app.get("/H7xkBwkFmw0PsjwG", (req, res) => {
  res.type("application/javascript");
  res.sendFile(path.join(__dirname, "public", "details.js"));
});

app.get("/9p0awnBjM36Hawsa", (req, res) => {
  res.type("application/javascript");
  res.sendFile(path.join(__dirname, "public", "filter.js"));
});

app.get("/Jwh6aVmNspzhJajM", (req, res) => {
  res.type("application/javascript");
  res.sendFile(path.join(__dirname, "public", "map-details.js"));
});
/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/api/vehicles", async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  res.json(vehicles);
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle found
 *       404:
 *         description: Vehicle not found
 */
app.get("/api/vehicles/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const car = await prisma.vehicle.findUnique({
      where: { id }
    });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /vehicles:
 *  post:
 *   summary: Add New Vehicle
 *   tags: [CRUD Vehicles]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *        - id
 *        - car_name
 *        - brand
 *        - type
 *        - category
 *        - fuel
 *        - colors
 *        - price
 *        - topSpeed
 *        - image
 *        - authorId
 *       properties:
 *        id:
 *          type: integer
 *        car_name:
 *          type: string
 *        brand:
 *          type: string
 *        type:
 *          type: string
 *        category:
 *          type: string
 *        fuel:
 *          type: string
 *        colors:
 *          type: string
 *        price:
 *          type: integer
 *        topSpeed:
 *          type: integer
 *        image:
 *          type: string
 *        authorId:
 *          type: integer
 *   responses:
 *    201:
 *     description: Vehicle created successfully
 */
app.post("/api/vehicles", (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { car_name, brand, type, category, fuel, colors, price, topSpeed, authorId } = req.body;

    if (!car_name || !brand || !type || !category || !fuel || !price || !topSpeed || !req.file) {
      return res.status(400).json({
        message: "Data are not fully filled",
      });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        car_name,
        brand,
        type,
        category,
        fuel,
        colors: colors || null,
        price: Number(price),
        topSpeed: topSpeed ? Number(topSpeed) : null,
        image: `/uploads/${req.file.filename}`,
        authorId: authorId ? Number(authorId) : null
      },
    });

    res.status(201).json({
      message: "Vehicle successfully added!",
      data: vehicle,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
});

/* ================= MAPS ================= */
app.get("/api/maps", async (req, res) => {
  try {
    const maps = await prisma.maps.findMany({
      select: {
        place_id: true,
        place_name: true,
        place_category: true,
        place_image: true,
        place_desc: true,
        location_link_ref: true,
        uses: true
      }
    });

    res.json(maps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch maps" });
  }
});

app.get("/api/maps/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const map = await prisma.maps.findUnique({
      where: { place_id: id }
    });

    if (!map) {
      return res.status(404).json({ error: "Map not found" });
    }

    res.json(map);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch map detail" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is successfully running");
});