import type { NextFunction, Request, Response } from 'express'; 
import { getUserById } from '../services/users.service.ts'; 

// Middleware to ensure UserId uniqueness on create and update
export async function ensureUniqueUserId(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.body || {};                           
  if (!userId) return next();  // if there is no email, skip  

  const found = await getUserById(userId);  // Search in DB
  if (!found) return next();  // if not found, OK

  // If found, check if it's the same user (for updates)
  const requestedId = Number(req.params.userId); // Parser:id from string to number
  if (requestedId && found.id === requestedId) return next();

  return res.status(409).json({ error: 'User already has a subscription' }); 
}
