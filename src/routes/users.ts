import { Router } from 'express'
import { createUserController, listUsersController, getUserController, updateUserController, deleteUserController } from '../controllers/users.controller.ts'
// import { requireCreateUserBody } from '../middlewares/require-create-user.middleware.ts'
// import { ensureUniqueEmail } from '../middlewares/unique-email.middleware.ts'

const userRouter = Router()

// List all Users
userRouter.get('/', listUsersController)
// Get User by ID
userRouter.get('/:id', getUserController)
// Create a new User with validation and uniqueness check
// userRouter.post('/', requireCreateUserBody, ensureUniqueEmail, createUserController)
// Create a new User
userRouter.post('/', createUserController)
// Update User by ID with uniqueness check
userRouter.put('/:id', /* ensureUniqueEmail, */ updateUserController)
// Delete User by ID
userRouter.delete('/:id', deleteUserController)

export default userRouter
