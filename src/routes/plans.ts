import { Router, type Request, type Response } from "express";
import { getPlan, getPlans, createPlan, deletePlan, updatePlan} from "../controllers/plans.controller.ts";

const router:Router = Router();

router.get('/:id', (req: Request<{ id: number }>, res: Response) => {
    console.log(`Printing Plan ${req.params.id}`);
    getPlan(req, res);
});

router.get('/', (req:Request, res:Response) => {
    console.log('Printing Plans');
    getPlans(req, res);
});

router.post('/', (req: Request, res: Response) => {
  console.log('Creating Plan');
  createPlan(req, res);
});

router.delete('/:id', (req: Request<{ id: number }>, res: Response) => {
  console.log(`Deleting Plan ${req.params.id}`);
  deletePlan(req, res);
});

router.put('/:id', (req: Request<{ id: number }>, res: Response) => {
  console.log(`Updating Plan ${req.params.id}`);
  updatePlan(req, res);
});

export { router };