import { sequelize, Order, OrderProduct, Product } from '../models/index.ts'
import { Op, Transaction, fn, literal } from 'sequelize'

export type OrderItemInput = { producto_id: number; cantidad: number }

export type CreateOrderData = {
  usuario_id: number;
  estado?: 'pendiente' | 'preparando' | 'entregado';
  fecha?: Date | string;
  items: OrderItemInput[];
}

export type UpdateOrderData = Partial<CreateOrderData>

// List all, ordered by id ascending
export function listOrders() {
  return Order.findAll({ order: [['id', 'ASC']] })
}

// Search by primary key (id)
export function getOrderById(id: number) {
  return Order.findByPk(id)
}

// Create a new Order with its items (transaction)
export async function createOrder(data: CreateOrderData) {
  return sequelize.transaction(async (t: Transaction) => {
    const order = await Order.create(
      {
        usuario_id: data.usuario_id,
        estado: data.estado ?? 'pendiente',
        fecha: data.fecha ? new Date(data.fecha) : new Date(),
      },
      { transaction: t }
    )

    if (data.items?.length) {
      await OrderProduct.bulkCreate(
        data.items.map(i => ({
          pedido_id: order.id,
          producto_id: i.producto_id,
          cantidad: i.cantidad,
        })),
        { transaction: t }
      )
    }
    return order
  })
}

// Update only fields present in 'data'
export async function updateOrder(id: number, data: UpdateOrderData) {
  const row = await Order.findByPk(id)
  if (!row) return null
  const payload: any = { ...data }
  if (data.fecha) payload.fecha = new Date(data.fecha)
  await row.update(payload)
  return row
}

// Delete by primary key (id)
export async function deleteOrder(id: number) {
  const row = await Order.findByPk(id)
  if (!row) return false
  await row.destroy()
  return true
}

// Pedidos filtrados por estado (Op.in)
export function filterOrdersByEstado(estados: Array<'pendiente' | 'preparando' | 'entregado'>) {
  return Order.findAll({
    where: { estado: { [Op.in]: estados } },
    order: [['id', 'ASC']],
  })
}

// Pedidos con fecha > dada (Op.gt)
export function listOrdersAfterDate(date: Date | string) {
  return Order.findAll({
    where: { fecha: { [Op.gt]: new Date(date) } },
    order: [['fecha', 'ASC']],
  })
}

// Calcular total de un pedido (SUM(cantidad * precio)) 
export async function getOrderTotal(pedidoId: number) {
  const row = await OrderProduct.findOne({
    where: { pedido_id: pedidoId },
    include: [{ model: Product, as: 'producto', attributes: [] }],
    attributes: [
      [fn('SUM', literal('"pedido_productos"."cantidad" * "producto"."precio"')), 'total']
    ],
  })

  const total = (row?.get('total') as string | null) ?? '0.00'
  return { pedido_id: pedidoId, total }
}
