import express, { Application } from "express";
import { PORT } from "./config";
import mainRoutes from "./api";
import cors from "cors";
import { connectDB } from "./utils/connectDB";

// Define The Server
const app: Application = express();

// Define The Port
const port = PORT || 8080;

// Connect To Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Test Main Route
app.use("/api", mainRoutes);

// Start Server on Port
app.listen(port, () => {
  console.log(`Starting Server on Port: ${port}`);
});
