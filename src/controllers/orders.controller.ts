import type { Request, Response } from 'express'
import { listOrders, getOrderById, createOrder, updateOrder, deleteOrder, filterOrdersByEstado, listOrdersAfterDate, getOrderTotal } from '../services/orders.service.ts'
import { log } from 'console'

// Create
export async function createOrderController(req: Request, res: Response) {
  const order = await createOrder(req.body) // { usuario_id, estado?, fecha?, items: [{producto_id,cantidad}] }
  return res.status(201).json(order)
}

// List
export async function listOrdersController(_req: Request, res: Response) {
  const orders = await listOrders()
  log(orders)
  return res.json(orders)
}

// Get by id
export async function getOrderController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const order = await getOrderById(id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  return res.json(order)
}

// Update (estado/fecha/usuario_id)
export async function updateOrderController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const updated = await updateOrder(id, req.body)
  if (!updated) return res.status(404).json({ error: 'Order not found' })
  return res.json(updated)
}

// Delete
export async function deleteOrderController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const ok = await deleteOrder(id)
  if (!ok) return res.status(404).json({ error: 'Order not found' })
  return res.status(204).send()
}

// Pedidos filtrados por estado (Op.in) 
export async function filterOrdersByEstadoController(req: Request, res: Response) {
  const estados = String(req.query.in ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean) as Array<'pendiente' | 'preparando' | 'entregado'>

  if (!estados.length) return res.status(400).json({ error: 'Missing query param: in' })
  const rows = await filterOrdersByEstado(estados)
  return res.json(rows)
}

// Pedidos con fecha > dada (Op.gt) 
export async function listOrdersAfterDateController(req: Request, res: Response) {
  const date = String(req.query.date ?? '').trim()
  if (!date) return res.status(400).json({ error: 'Missing query param: date' })
  const rows = await listOrdersAfterDate(date)
  return res.json(rows)
}

// Total de un pedido
export async function getOrderTotalController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
  const result = await getOrderTotal(id)
  return res.json(result) // { pedido_id, total }
}
