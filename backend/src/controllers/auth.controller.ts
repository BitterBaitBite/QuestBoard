import type { Request, Response } from "express";
import { User } from "../models/User.model";
import { generateTokens } from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();

    return res.status(201).json({ message: "User registered" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    return res.json({ accessToken });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "No refresh token" });

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET!) as {
      id: string;
    };
    const { accessToken, refreshToken } = generateTokens(decoded.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    return res.json({ accessToken });
  } catch (err: any) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
}
