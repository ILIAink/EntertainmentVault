import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import cors from "cors";
import express from "express";
import { router as movieRouter } from "./routes/movieRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins explicitly
    credentials: false, // Set to false since we're using origin: "*"
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
    ],
    exposedHeaders: ["Content-Length", "X-Requested-With"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json()); // Needed for frontend interactions

// Additional CORS headers as backup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "false");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
app.use("/api/movies", movieRouter);
app.use("/api/user", userRouter);

app.use("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
