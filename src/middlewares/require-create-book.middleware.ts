import type { NextFunction, Request, Response } from 'express'   

// Validation middleware for creating a book
export function requireCreateBookBody(req: Request, res: Response, next: NextFunction) {
  const { title, author, ownerID } = req.body || {}; // Bring required fields

  if (!title || typeof title !== 'string')                       
    return res.status(400).json({ error: 'title is required (string)' });

  if (!author || typeof author !== 'string')               
    return res.status(400).json({ error: 'author is required (string)' });

  if (!ownerID || typeof ownerID !== 'number') 
    return res.status(400).json({ error: 'ownerID is required (number)' });

  next();                                                       
}
