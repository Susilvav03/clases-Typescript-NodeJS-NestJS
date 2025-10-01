import { Router } from 'express';                             
import { createUserController, listUsersController, getUserController, updateUserController, deleteUserController } from '../controllers/user.controller.ts';                      

import { requireCreateUserBody } from '../middlewares/require-create-user.middleware.ts'; 
import { ensureUniqueEmail } from '../middlewares/unique-email.middleware.ts';            

const userRouter = Router();                                      

// List all users
userRouter.get('/', listUsersController);       
// Get user by ID
userRouter.get('/:id', getUserController);          
// Create a new user with validation and uniqueness check              
userRouter.post('/', requireCreateUserBody, ensureUniqueEmail, createUserController);
// Update user by ID with uniqueness check
userRouter.put('/:id', ensureUniqueEmail, updateUserController)
// Delete user by ID
userRouter.delete('/:id', deleteUserController);                  

export default userRouter;                                        
