import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRouter";

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);

// Home route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express.js TypeScript Project Setup!");
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
  console.log(`Server is running on http://localhost:${PORT}`);
});
