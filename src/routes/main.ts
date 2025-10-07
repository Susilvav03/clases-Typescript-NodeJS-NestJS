import productRouter from './products.ts'
import orderRouter from './orders.ts'
import userRouter from './users.ts'

import { Router } from 'express'

const router = Router()

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

export default router
