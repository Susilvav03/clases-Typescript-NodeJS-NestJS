import { Router, type Request, type Response } from "express";
import { getUser, getUsers, createUser, deleteUser, updateUser} from "../controllers/users.controller.ts";

const router:Router = Router();

router.get('/:id', (req: Request<{ id: number }>, res: Response) => {
    console.log(`Printing User ${req.params.id}`);
    getUser(req, res);
});

router.get('/', (req:Request, res:Response) => {
    console.log('Printing Users');
    getUsers(req, res);
});

router.post('/', (req: Request, res: Response) => {
  console.log('Creating User');
  createUser(req, res);
});

router.delete('/:id', (req: Request<{ id: number }>, res: Response) => {
  console.log(`Deleting User ${req.params.id}`);
  deleteUser(req, res);
});

router.put('/:id', (req: Request<{ id: number }>, res: Response) => {
  console.log(`Updating User ${req.params.id}`);
  updateUser(req, res);
});

export { router };