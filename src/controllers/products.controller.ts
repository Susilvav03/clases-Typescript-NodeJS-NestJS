import type { Request, Response } from 'express'
import { createProduct, listProducts, getProductById, updateProduct, deleteProduct, searchProductsByCategoryLike } from '../services/products.service.ts'
import { log } from 'console'

// Create
export async function createProductController(req: Request, res: Response) {
  const product = await createProduct(req.body)
  return res.status(201).json(product)
}

// List
export async function listProductsController(_req: Request, res: Response) {
  const products = await listProducts()
  log(products)
  return res.json(products)
}

// Get by id
export async function getProductController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const product = await getProductById(id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  return res.json(product)
}

// Update
export async function updateProductController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const updated = await updateProduct(id, req.body)
  if (!updated) return res.status(404).json({ error: 'Product not found' })
  return res.json(updated)
}

// Delete
export async function deleteProductController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const ok = await deleteProduct(id)
  if (!ok) return res.status(404).json({ error: 'Product not found' })
  return res.status(204).send()
}

// Buscar productos por categoría (Op.like)
export async function searchProductsByCategoryController(req: Request, res: Response) {
  const categoria = String(req.query.categoria ?? '').trim()
  if (!categoria) return res.status(400).json({ error: 'Missing query param: categoria' })
  const rows = await searchProductsByCategoryLike(categoria)
  return res.json(rows)
}
