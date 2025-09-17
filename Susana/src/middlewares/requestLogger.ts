import type { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

// Route to the log file
const logFile = path.join(__dirname, "../../logs/requests.log");

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date().toISOString();
  const log = `[${now}] ${req.method} ${req.originalUrl} - IP: ${req.ip}\n`;

  // Create logs directory if it doesn't exist
  const logDir = path.dirname(logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Save log to file
  fs.appendFileSync(logFile, log);

  next();
};
