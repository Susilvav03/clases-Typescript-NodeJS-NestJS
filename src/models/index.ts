import { sequelize } from '../config/database.ts'
import { User } from './user.model.ts'
import { Product } from './product.model.ts'
import { Order } from './order.model.ts'
import { OrderProduct } from './order-products.model.ts'
import { setupAssociations } from './associations.ts'

setupAssociations()

export { sequelize, User, Product, Order, OrderProduct }