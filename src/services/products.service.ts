import { Product } from '../models/index.ts'
import { Op } from 'sequelize'

export type CreateProductData = {
  nombre: string;
  precio: string | number;   // DECIMAL en DB
  categoria: string;
}

export type UpdateProductData = Partial<CreateProductData>

// Normalize precio to string with 2 decimal places
function normalizePrecio(precio: string | number): string {
  return typeof precio === 'number' ? precio.toFixed(2) : precio
}

// Create a new Product
export function createProduct(data: CreateProductData) {
  return Product.create({ ...data, precio: normalizePrecio(data.precio) })
}

// List all, ordered by id ascending
export function listProducts() {
  return Product.findAll({ order: [['id', 'ASC']] })
}

// Search by primary key (id)
export function getProductById(id: number) {
  return Product.findByPk(id)
}

// Search by unique nombre
export function getProductByName(nombre: string) {
  return Product.findOne({ where: { nombre } })
}

// Update only fields present in 'data'
export async function updateProduct(id: number, data: UpdateProductData) {
  const row = await Product.findByPk(id)
  if (!row) return null
  const payload = { ...data } as any
  if (data.precio !== undefined) payload.precio = normalizePrecio(data.precio)
  await row.update(payload)
  return row
}

// Delete by primary key (id)
export async function deleteProduct(id: number) {
  const row = await Product.findByPk(id)
  if (!row) return false
  await row.destroy()
  return true
}

// Buscar productos por categoría (Op.like)
export function searchProductsByCategoryLike(pattern: string) {
  return Product.findAll({
    where: { categoria: { [Op.like]: `%${pattern}%` } },
    order: [['id', 'ASC']],
  })
}
