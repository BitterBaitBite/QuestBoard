import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "QuestBoard API" });
});

export default router;
