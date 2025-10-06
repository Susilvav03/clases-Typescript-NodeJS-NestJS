import { User } from './user.model.ts';
import { Product } from './product.model.ts';
import { Order } from './order.model.ts';
import { OrderProduct } from './order-products.model.ts';

export function setupAssociations() {
  User.hasMany(Order, { foreignKey: 'usuario_id', as: 'pedidos' });
  Order.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

  Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'pedido_id',
    otherKey: 'producto_id',
    as: 'productos',
  });

  Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'producto_id',
    otherKey: 'pedido_id',
    as: 'pedidos',
  });

  // Accesos directos
  Order.hasMany(OrderProduct, { foreignKey: 'pedido_id', as: 'items' });
  OrderProduct.belongsTo(Product, { foreignKey: 'producto_id', as: 'producto' });
}
