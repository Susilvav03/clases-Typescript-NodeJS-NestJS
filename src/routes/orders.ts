import { Router } from 'express'
import { createOrderController, listOrdersController, getOrderController, updateOrderController, deleteOrderController, filterOrdersByEstadoController, listOrdersAfterDateController, getOrderTotalController } from '../controllers/orders.controller.ts'

const orderRouter = Router()

// List all Orders
orderRouter.get('/', listOrdersController)
// Filter orders by estado (Op.in)
orderRouter.get('/filter/estado', filterOrdersByEstadoController) // ?in=pendiente,preparando
// List orders after a specific date (Op.gt)
orderRouter.get('/filter/after', listOrdersAfterDateController)   // ?date=YYYY-MM-DD
// Get Order total by ID
orderRouter.get('/:id/total', getOrderTotalController)
// Get Order by ID
orderRouter.get('/:id', getOrderController)
// Create a new Order
orderRouter.post('/', createOrderController)
// Update Order by ID
orderRouter.put('/:id', updateOrderController)
// Delete Order by ID
orderRouter.delete('/:id', deleteOrderController)

export default orderRouter
