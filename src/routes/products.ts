import { Router } from 'express';                             
import { createBookController, listBooksController, getBookController, updateBookController, deleteBookController } from '../controllers/product.controller.ts';                      
import { requireCreateBookBody } from '../middlewares/require-create-book.middleware.ts';

const bookRouter = Router();                                      

// List all Books
bookRouter.get('/', listBooksController);       
// Get Book by ID
bookRouter.get('/:id', getBookController);          
// Create a new Book with validation and uniqueness check              
bookRouter.post('/', requireCreateBookBody, createBookController);
// Update Book by ID with uniqueness check
bookRouter.put('/:id', updateBookController)
// Delete Book by ID
bookRouter.delete('/:id', deleteBookController);                  

export default bookRouter;                                        
