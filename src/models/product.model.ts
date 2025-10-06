import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize';
import { sequelize } from '../config/database.ts';

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare precio: string;          
  declare categoria: string;
  declare created_at: CreationOptional<Date>;
}

Product.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    precio: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    categoria: { type: DataTypes.STRING(60), allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'productos', timestamps: false, freezeTableName: true }
);
