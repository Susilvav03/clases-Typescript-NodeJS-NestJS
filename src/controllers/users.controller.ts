import type { Request, Response } from 'express'
import { createUser, listUsers, getUserById, updateUser, deleteUser } from '../services/users.service.ts'
import { log } from 'console'

// Create
export async function createUserController(req: Request, res: Response) {
  const user = await createUser(req.body)
  return res.status(201).json(user)
}

// List
export async function listUsersController(_req: Request, res: Response) {
  const users = await listUsers()
  log(users)
  return res.json(users)
}

// Get by id
export async function getUserController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const user = await getUserById(id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  return res.json(user)
}

// Update
export async function updateUserController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const updated = await updateUser(id, req.body)
  if (!updated) return res.status(404).json({ error: 'User not found' })
  return res.json(updated)
}

// Delete
export async function deleteUserController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const ok = await deleteUser(id)
  if (!ok) return res.status(404).json({ error: 'User not found' })
  return res.status(204).send()
}
