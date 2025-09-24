import { promises as fs } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import type { IBook } from "../interfaces/book.interface.ts"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filepath = join(__dirname, "../models/books.model.json")

const getBookService = async (id: number): Promise<IBook|null> => {
    const data = await fs.readFile(filepath, "utf-8")
    const books: IBook[] = JSON.parse(data) as IBook[]
    const book = books.find(book => book.id == id) || null
    return book
}

const getBooksService = async (): Promise<IBook[]> => {
    const data = await fs.readFile(filepath, "utf-8")
    const books: IBook[] = JSON.parse(data) as IBook[]
    return books
}

const createBookService = async (book: IBook): Promise<IBook> => {
    const data = await fs.readFile(filepath, "utf-8")
    const books: IBook[] = JSON.parse(data) as IBook[]
    books.push(book)
    await fs.writeFile(filepath, JSON.stringify(books, null, 2))
    return book
}

const updateBookService = async (id: number, book: IBook): Promise<IBook|null> => {
    const data = await fs.readFile(filepath, "utf-8")
    const books: IBook[] = JSON.parse(data) as IBook[]
    const index = books.findIndex(book => book.id == id)
    if (index === -1) return null
    books[index] = book
    await fs.writeFile(filepath, JSON.stringify(books, null, 2))
    return book
}

const deleteBookService = async (id: number): Promise<void> => {
    const data = await fs.readFile(filepath, "utf-8")
    const books: IBook[] = JSON.parse(data) as IBook[]
    const filteredbooks = books.filter(book => book.id != id)
    await fs.writeFile(filepath, JSON.stringify(filteredbooks, null, 2))
}

export { getBookService, getBooksService, createBookService, updateBookService, deleteBookService }
