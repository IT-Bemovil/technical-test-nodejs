import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("authorization");
  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  try {
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET || ""
    );

    req.body.userId = (verified as any).uid;

    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
