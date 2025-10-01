import type { Request, Response } from 'express'       
import { createUser, listUsers, getUserById, updateUser, deleteUser } from '../services/user.service.ts'
import { log } from 'console';

// Controller to handle user creation
export async function createUserController(req: Request, res: Response) {
  const user = await createUser(req.body);                   
  return res.status(201).json(user);                         
}

// Controller to list all users
export async function listUsersController(_req: Request, res: Response) {
  const users = await listUsers();  
  log(users);                         
  return res.json(users); 

}

// Controller to get a user by ID
export async function getUserController(req: Request, res: Response) {
  const id = Number(req.params.id); // Parser:id from string to number
  const user = await getUserById(id);                        
  if (!user) return res.status(404).json({ error: 'User not found' }); 
  return res.json(user);                                     
}

// Controller to update a user by ID
export async function updateUserController(req: Request, res: Response) {
  const id = Number(req.params.id);  // Parser:id from string to number
  const updated = await updateUser(id, req.body); // Partial update
  if (!updated) return res.status(404).json({ error: 'User not found' }); 
  return res.json(updated);                                  
}

// Controller to delete a user by ID
export async function deleteUserController(req: Request, res: Response) {
  const id = Number(req.params.id);  // Parser:id from string to number
  const ok = await deleteUser(id);   // true if deleted
  if (!ok) return res.status(404).json({ error: 'User not found' }); 
  return res.status(204).send();                             
}
