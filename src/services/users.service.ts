import { User } from '../models/index.ts'
import { Op } from 'sequelize'

export type CreateUserData = {
  nombre: string;
  email: string;
  rol?: 'admin' | 'cliente';
}

// Partial makes all fields optional
export type UpdateUserData = Partial<CreateUserData>

// Create a new User
export function createUser(data: CreateUserData) {
  return User.create(data)
}

// List all, ordered by id ascending
export function listUsers() {
  return User.findAll({ order: [['id', 'ASC']] })
}

// Search by primary key (id)
export function getUserById(id: number) {
  return User.findByPk(id)
}

// Search by unique email
export function getUserByEmail(email: string) {
  return User.findOne({ where: { email } })
}

// Update only fields present in 'data'
export async function updateUser(id: number, data: UpdateUserData) {
  const row = await User.findByPk(id)
  if (!row) return null
  await row.update(data)
  return row
}

// Delete by primary key (id)
export async function deleteUser(id: number) {
  const row = await User.findByPk(id)
  if (!row) return false
  await row.destroy()
  return true
}
