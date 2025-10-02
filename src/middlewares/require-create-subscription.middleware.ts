import type { NextFunction, Request, Response } from 'express'   

// Validation middleware for creating a Subscription
export function requireCreateSubscriptionBody(req: Request, res: Response, next: NextFunction) {
  const { userId, planId, startDate} = req.body || {}; // Bring required fields

  if (!userId || typeof userId !== 'number')                       
    return res.status(400).json({ error: 'userId is required (number)' });

  if (!planId || typeof planId !== 'number')               
    return res.status(400).json({ error: 'planId is required (number)' });

  if (!startDate || typeof startDate !== 'string' || isNaN(Date.parse(startDate))) // Date in valid format
    return res.status(400).json({ error: 'valid startDate is required (string date)' });

  next();                                                       
}
