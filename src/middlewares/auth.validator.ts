import type { NextFunction, Request, Response } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { getUserService } from "../services/users.services.ts";
import { get } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "../models/books.json");

export async function checkPermissions(req: Request, res: Response, next: NextFunction) {
  
  const { created_by } = req.body;
  const role = getUserService(created_by).then(user => user?.role);

  // if the user is not admin, return a 403 Forbidden response
  if (await role !== "admin") {
    return res.status(403).json({
      error: "Forbidden: only admin users can create new users",
    });
  }
  // if the user is admin, proceed to the next middleware or route handler
  next();
}