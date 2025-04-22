import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/mongo";
import locationRouter from "./routes/locationRouter";
import routeRouter from "./routes/routeRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    console.log("✅ MongoDB connection successful");

    // Middleware
    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Routes
    app.use("/locations", locationRouter);
    app.use("/routes", routeRouter);

    // Home route
    app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to lagos guide backend");
    });

    // 404 Error Handling
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send("Route not found!");
    });

    // Global Error Handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
