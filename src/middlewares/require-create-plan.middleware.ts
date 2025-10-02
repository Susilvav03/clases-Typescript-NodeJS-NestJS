import type { NextFunction, Request, Response } from 'express'   

// Validation middleware for creating a Plan
export function requireCreatePlanBody(req: Request, res: Response, next: NextFunction) {
  const { name, price, maxBooks} = req.body || {}; // Bring required fields

  if (!name || typeof name !== 'string')                       
    return res.status(400).json({ error: 'name is required (string)' });

  if (!price || typeof price !== 'number')               
    return res.status(400).json({ error: 'price is required (number)' });

  if (!maxBooks || typeof maxBooks !== 'number') 
    return res.status(400).json({ error: 'maxBooks is required (number)' });

  next();                                                       
}
