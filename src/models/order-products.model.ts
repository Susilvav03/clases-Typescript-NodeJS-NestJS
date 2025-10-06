import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '../config/database.ts';

export class OrderProduct extends Model<InferAttributes<OrderProduct>, InferCreationAttributes<OrderProduct>> {
  declare pedido_id: number;
  declare producto_id: number;
  declare cantidad: number;
}

OrderProduct.init(
  {
    pedido_id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
    producto_id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: 'pedido_productos', timestamps: false, freezeTableName: true }
);
