import { Router } from 'express';                             
import { createSubscriptionController, listSubscriptionsController, getSubscriptionController, updateSubscriptionController, deleteSubscriptionController } from '../controllers/subscription.controller.ts';                      

import { requireCreateSubscriptionBody } from '../middlewares/require-create-subscription.middleware.ts'; 
import { ensureUniqueUserId } from '../middlewares/unique-userid.middleware.ts';            

const subscriptionRouter = Router();                                      

// List all Subscriptions
subscriptionRouter.get('/', listSubscriptionsController);       
// Get Subscription by ID
subscriptionRouter.get('/:id', getSubscriptionController);          
// Create a new Subscription with validation and uniqueness check              
subscriptionRouter.post('/', requireCreateSubscriptionBody, ensureUniqueUserId, createSubscriptionController);
// Update Subscription by ID with uniqueness check
subscriptionRouter.put('/:id', ensureUniqueUserId, updateSubscriptionController)
// Delete Subscription by ID
subscriptionRouter.delete('/:id', deleteSubscriptionController);                  

export default subscriptionRouter;                                        
