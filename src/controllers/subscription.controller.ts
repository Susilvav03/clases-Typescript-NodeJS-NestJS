import type { Request, Response } from 'express'       
import { createSubscription, listSubscriptions, getSubscriptionById, getSubscriptionByUserId, updateSubscription, deleteSubscription, findActiveSubscriptions, findFutureSubscriptions, findNonActiveSubscriptions } from '../services/subscription.service.ts'
import { log } from 'console';

// Controller to handle Subscription creation
export async function createSubscriptionController(req: Request, res: Response) {
  const Subscription = await createSubscription(req.body);                   
  return res.status(201).json(Subscription);                         
}

// Controller to list all Subscriptions
export async function listSubscriptionsController(_req: Request, res: Response) {
  const subscriptions = await listSubscriptions();  
  log(subscriptions);                         
  return res.json(subscriptions); 

}

// Controller to get a Subscription by ID
export async function getSubscriptionController(req: Request, res: Response) {
  const id = Number(req.params.id); // Parser:id from string to number
  const subscription = await getSubscriptionById(id);                        
  if (!subscription) return res.status(404).json({ error: 'Subscription not found' }); 
  return res.json(subscription);                                     
}

// Controller to get a Subscription by user ID
export async function getSubscriptionByUserController(req: Request, res: Response) {
  const userId = Number(req.params.userId); // Parser:userId from string to number
  const subscription = await getSubscriptionByUserId(userId);                        
  if (!subscription) return res.status(404).json({ error: 'Subscription not found' }); 
  return res.json(subscription);                                     
}

// Controller to update a Subscription by ID
export async function updateSubscriptionController(req: Request, res: Response) {
  const id = Number(req.params.id);  // Parser:id from string to number
  const updated = await updateSubscription(id, req.body); // Partial update
  if (!updated) return res.status(404).json({ error: 'Subscription not found' }); 
  return res.json(updated);                                  
}

// Controller to delete a Subscription by ID
export async function deleteSubscriptionController(req: Request, res: Response) {
  const id = Number(req.params.id);  // Parser:id from string to number
  const ok = await deleteSubscription(id);   // true if deleted
  if (!ok) return res.status(404).json({ error: 'Subscription not found' }); 
  return res.status(204).send();                             
}

// Controller to list all active subscriptions
export async function listActiveSubscriptionsController(_req: Request, res: Response) {
  const subscriptions = await findActiveSubscriptions();  
  log(subscriptions);                         
  return res.json(subscriptions); 
}

// Controller to list all future subscriptions
export async function listFutureSubscriptionsController(_req: Request, res: Response) {
  const subscriptions = await findFutureSubscriptions();  
  log(subscriptions);                         
  return res.json(subscriptions); 
}

// Controller to list all non-active subscriptions
export async function listNonActiveSubscriptionsController(_req: Request, res: Response) {
  const subscriptions = await findNonActiveSubscriptions();  
  log(subscriptions);                         
  return res.json(subscriptions); 
}
