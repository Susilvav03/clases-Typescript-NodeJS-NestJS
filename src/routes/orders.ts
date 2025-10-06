import { Router } from 'express';                             
import { createPlanController, listPlansController, getPlanController, updatePlanController, deletePlanController, listExpensivePlansController, listBasicPlansController } from '../controllers/order.controller.ts';                      

import { requireCreatePlanBody } from '../middlewares/require-create-plan.middleware.ts';      

const planRouter = Router();                                      

// List all Plans
planRouter.get('/', listPlansController); 
// List expensive Plans
planRouter.get('/expensive', listExpensivePlansController);  
// List basic Plans
planRouter.get('/basic', listBasicPlansController);       
// Get Plan by ID
planRouter.get('/:id', getPlanController);          
// Create a new Plan with validation and uniqueness check              
planRouter.post('/', requireCreatePlanBody, createPlanController);
// Update Plan by ID with uniqueness check
planRouter.put('/:id', updatePlanController)
// Delete Plan by ID
planRouter.delete('/:id', deletePlanController);          

export default planRouter;                                        
