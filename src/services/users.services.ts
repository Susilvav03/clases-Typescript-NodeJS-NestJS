import { promises as fs } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import type { IUser } from "../interfaces/user.interface.ts"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filepath = join(__dirname, "../models/users.model.json")

const getUserService = async (id: number): Promise<IUser|null> => {
    const data = await fs.readFile(filepath, "utf-8")
    const users: IUser[] = JSON.parse(data) as IUser[]
    const user = users.find(user => user.id === id) || null
    return user
}

const getUsersService = async (): Promise<IUser[]> => {
    const data = await fs.readFile(filepath, "utf-8")
    const users: IUser[] = JSON.parse(data) as IUser[]
    return users
}

const createUserService = async (user: IUser): Promise<IUser> => {
    const data = await fs.readFile(filepath, "utf-8")
    const users: IUser[] = JSON.parse(data) as IUser[]
    users.push(user)
    await fs.writeFile(filepath, JSON.stringify(users, null, 2))
    return user
}

const updateUserService = async (id: number, user: IUser): Promise<IUser|null> => {
    const data = await fs.readFile(filepath, "utf-8")
    const users: IUser[] = JSON.parse(data) as IUser[]
    const index = users.findIndex(user => user.id === id)
    if (index === -1) return null
    users[index] = user
    await fs.writeFile(filepath, JSON.stringify(users, null, 2))
    return user
}

const deleteUserService = async (id: number): Promise<void> => {
    const data = await fs.readFile(filepath, "utf-8")
    const users: IUser[] = JSON.parse(data) as IUser[]
    const filteredUsers = users.filter(user => user.id !== id)
    await fs.writeFile(filepath, JSON.stringify(filteredUsers, null, 2))
}

export { getUserService, getUsersService, createUserService, updateUserService, deleteUserService }