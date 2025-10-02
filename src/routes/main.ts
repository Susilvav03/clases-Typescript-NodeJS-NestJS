import bookRouter from "./books.ts";
import planRouter from "./plans.ts";
import subscriptionRouter from "./subscriptions.ts";
import userRouter from "./users.ts";


import { Router } from "express";

const router = Router();

router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/plans', planRouter);
router.use('/subscriptions', subscriptionRouter);

export default router;