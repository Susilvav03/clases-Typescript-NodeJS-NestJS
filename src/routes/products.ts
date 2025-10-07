import { Router } from 'express'
import { createProductController, listProductsController, getProductController, updateProductController, deleteProductController, searchProductsByCategoryController } from '../controllers/products.controller.ts'

const productRouter = Router()

// List all Products
productRouter.get('/', listProductsController)
// Search products by category (Op.like)
productRouter.get('/search', searchProductsByCategoryController) // ?categoria=...
// Get Product by ID
productRouter.get('/:id', getProductController)
// Create a new Product
productRouter.post('/', createProductController)
// Update Product by ID
productRouter.put('/:id', updateProductController)
// Delete Product by ID
productRouter.delete('/:id', deleteProductController)

export default productRouter
