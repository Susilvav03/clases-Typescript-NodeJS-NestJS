import type { Request, Response } from 'express'       
import { createPlan, listPlans, getPlanById, updatePlan, deletePlan, findBasicPlans, findExpensivePlans } from '../services/orders.service.ts'
import { log } from 'console';

// Controller to handle Plan creation
export async function createPlanController(req: Request, res: Response) {
  const plan = await createPlan(req.body);                   
  return res.status(201).json(plan);                         
}

// Controller to list all Plans
export async function listPlansController(_req: Request, res: Response) {
  const plans = await listPlans();  
  log(plans);                         
  return res.json(plans); 

}

// Controller to get a Plan by ID
export async function getPlanController(req: Request, res: Response) {
  const id = Number(req.params.id); // Parser:id from string to number
  const plan = await getPlanById(id);                        
  if (!plan) return res.status(404).json({ error: 'Plan not found' }); 
  return res.json(plan);                                     
}

// Controller to update a Plan by ID
export async function updatePlanController(req: Request, res: Response) {
  const id = Number(req.params.id);  // Parser:id from string to number
  const updated = await updatePlan(id, req.body); // Partial update
  if (!updated) return res.status(404).json({ error: 'Plan not found' }); 
  return res.json(updated);                                  
}

// Controller to delete a Plan by ID
export async function deletePlanController(req: Request, res: Response) {
  const id = Number(req.params.id);  // Parser:id from string to number
  const ok = await deletePlan(id);   // true if deleted
  if (!ok) return res.status(404).json({ error: 'Plan not found' }); 
  return res.status(204).send();                             
}

// Controller to list expensive Plans
export async function listExpensivePlansController(_req: Request, res: Response) {
  const plans = await findExpensivePlans();  
  log(plans);                         
  return res.json(plans);
}

// Controller to list basic Plans
export async function listBasicPlansController(_req: Request, res: Response) {
  const plans = await findBasicPlans();  
  log(plans);                         
  return res.json(plans);
}
