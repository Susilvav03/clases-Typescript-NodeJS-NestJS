import { Book } from '../models/index.ts'   
import { Op } from 'sequelize'

// Types for book creation and update
export type CreateBookData = {
  title: string;
  author: string;
  isbn?: string | null;
  genre?: string | null;
  language?: string | null;
  coverURL?: string | null;
  description?: string | null;
  ownerId: number;
  status?: string;
}

export type UpdateBookData = Partial<CreateBookData>    


// Create a new book
export function createBook(data: CreateBookData) {       
  return Book.create(data)
}

// List all, ordered by id ascending
export function listBooks() {                            
  return Book.findAll({ order: [['id', 'ASC']] })
}

// Search by primary key (id)
export function getBookById(id: number) {                
  return Book.findByPk(id)
}

// Search by author
export function getBookByAuthor(author: string) {          
  return Book.findAll({ where: { author } })
}

// Update only fields present in 'data'
export async function updateBook(id: number, data: UpdateBookData) { 
  const book = await Book.findByPk(id)
  if (!book) return null 
  await book.update(data)
  return book                        
}

// Delete by primary key (id)
export async function deleteBook(id: number) {           
  const book = await Book.findByPk(id)                  
  if (!book) return false                               
  await book.destroy() // delete from db
  return true                                           
}

// Search all available books
export function findAvailable() {
  return Book.findAll({
    where: { status: { [Op.eq]: 'available' } }
  })
}

// Search all non-available books
export function findNonAdmins() {
  return Book.findAll({
    where: { status: { [Op.ne]: 'available' } }
  })
}

// Search books created after 2025-01-01
export function findBooksCreatedAfter() {
  return Book.findAll({
    where: { createdAt: { [Op.gt]: new Date('2025-01-01') } }
  })
}
