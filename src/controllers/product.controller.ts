import type { Request, Response } from 'express'       
import { createBook, listBooks, getBookById, updateBook, deleteBook } from '../services/products.service.ts'
import { log } from 'console';

// Controller to handle book creation
export async function createBookController(req: Request, res: Response) {
  const book = await createBook(req.body);                   
  return res.status(201).json(book);                         
}

// Controller to list all Books
export async function listBooksController(_req: Request, res: Response) {
  const books = await listBooks();  
  log(books);                         
  return res.json(books); 

}

// Controller to get a Book by ID
export async function getBookController(req: Request, res: Response) {
  const id = Number(req.params.id); // Parser:id from string to number
  const book = await getBookById(id);                        
  if (!book) return res.status(404).json({ error: 'Book not found' }); 
  return res.json(book);                                     
}

// Controller to update a Book by ID
export async function updateBookController(req: Request, res: Response) {
  const id = Number(req.params.id);  // Parser:id from string to number
  const updated = await updateBook(id, req.body); // Partial update
  if (!updated) return res.status(404).json({ error: 'Book not found' }); 
  return res.json(updated);                                  
}

// Controller to delete a Book by ID
export async function deleteBookController(req: Request, res: Response) {
  const id = Number(req.params.id);  // Parser:id from string to number
  const ok = await deleteBook(id);   // true if deleted
  if (!ok) return res.status(404).json({ error: 'Book not found' }); 
  return res.status(204).send();                             
}

