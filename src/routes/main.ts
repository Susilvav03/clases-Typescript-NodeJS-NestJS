import bookRouter from "./products.ts";
import planRouter from "./orders.ts";
import userRouter from "./users.ts";


import { Router } from "express";

const router = Router();

router.use('/users', userRouter);
router.use('/products', bookRouter);
router.use('/orders', planRouter);

export default router;