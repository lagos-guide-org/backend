import { Router, Request, Response } from "express";

const router = Router();

// Get all users
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "List of all users" });
});

// Create a new user
router.post("/", (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.json({ message: `User ${name} with email ${email} created!` });
});

// Get a specific user by ID
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Details of user with ID ${id}` });
});

export default router;
