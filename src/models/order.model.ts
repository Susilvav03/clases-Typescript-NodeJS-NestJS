import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize';
import { sequelize } from '../config/database.ts';

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;
  declare fecha: Date;
  declare estado: CreationOptional<'pendiente' | 'preparando' | 'entregado'>;
  declare usuario_id: number;
}

Order.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    estado: { type: DataTypes.ENUM('pendiente', 'preparando', 'entregado'), allowNull: false, defaultValue: 'pendiente' },
    usuario_id: { type: DataTypes.BIGINT, allowNull: false },
  },
  { sequelize, tableName: 'pedidos', timestamps: false, freezeTableName: true }
);
