import { Router } from 'express';                             
import { createBookController, listBooksController, getBookController, updateBookController, deleteBookController } from '../controllers/book.controller.ts';                      

const bookRouter = Router();                                      

// List all Books
bookRouter.get('/', listBooksController);       
// Get Book by ID
bookRouter.get('/:id', getBookController);          
// Create a new Book with validation and uniqueness check              
bookRouter.post('/', createBookController);
// Update Book by ID with uniqueness check
bookRouter.put('/:id', updateBookController)
// Delete Book by ID
bookRouter.delete('/:id', deleteBookController);                  

export default bookRouter;                                        
