import type { NextFunction, Request, Response } from 'express'   

// Validation middleware for creating a user
export function requireCreateUserBody(req: Request, res: Response, next: NextFunction) {
  const { name, lastName, email, passwordHash } = req.body || {}; // Bring required fields

  if (!name || typeof name !== 'string')                       
    return res.status(400).json({ error: 'name is required (string)' });

  if (!lastName || typeof lastName !== 'string')               
    return res.status(400).json({ error: 'lastName is required (string)' });

  if (!email || typeof email !== 'string' || !email.includes('@')) // Email in valid format
    return res.status(400).json({ error: 'valid email is required' });

  if (!passwordHash || typeof passwordHash !== 'string')       
    return res.status(400).json({ error: 'passwordHash is required (hashed string)' });

  next();                                                       
}
