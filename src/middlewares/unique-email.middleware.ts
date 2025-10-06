import type { NextFunction, Request, Response } from 'express'; 
import { getUserByEmail } from '../services/users.service.ts'; 

// Middleware to ensure email uniqueness on create and update
export async function ensureUniqueEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body || {};                           
  if (!email) return next();  // if there is no email, skip  

  const found = await getUserByEmail(email);  // Search in DB
  if (!found) return next();  // if not found, OK

  // If found, check if it's the same user (for updates)
  const requestedId = Number(req.params.id);
  if (requestedId && found.id === requestedId) return next();

  return res.status(409).json({ error: 'email already in use' }); 
}
