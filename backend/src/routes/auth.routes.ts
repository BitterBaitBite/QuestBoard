import { Router } from "express";
import { register, login, refresh } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", (req, res, next) => res.json({ message: "API Auth" }));
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
