import { Router, type Request, type Response } from "express";
import { getBook, getBooks, createBook, deleteBook, updateBook} from "../controllers/books.controller.ts";

const router:Router = Router();

router.get('/:id', (req: Request<{ id: number }>, res: Response) => {
    console.log(`Printing Book ${req.params.id}`);
    getBook(req, res);
});

router.get('/', (req:Request, res:Response) => {
    console.log('Printing Books');
    getBooks(req, res);
});

router.post('/', (req: Request, res: Response) => {
  console.log('Creating Book');
  createBook(req, res);
});

router.delete('/:id', (req: Request<{ id: number }>, res: Response) => {
  console.log(`Deleting Book ${req.params.id}`);
  deleteBook(req, res);
});

router.put('/:id', (req: Request<{ id: number }>, res: Response) => {
  console.log(`Updating Book ${req.params.id}`);
  updateBook(req, res);
});

export { router };