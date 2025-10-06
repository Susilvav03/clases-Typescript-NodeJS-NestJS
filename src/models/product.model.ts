import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';                                      
import { sequelize } from '../config/database.ts';          


export class Product extends Model<
  InferAttributes<Product>,             // Existing attributes in the instance
  InferCreationAttributes<Product>      // Attributes needed to create a new instance
> {
  declare id: CreationOptional<number>; // SERIAL → autoincrement (
  declare name: string; 
  declare price: number; 
  declare category: string; // DEFAULT 'pendiente'
  declare createdAt: CreationOptional<Date>;  // Map created_at
}

// Intitialization: define table and columns
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,                           // SERIAL → INTEGER
      autoIncrement: true,                               // Autoincrement
      primaryKey: true,                                  // PRIMARY KEY
    },
    name: {
      type: DataTypes.STRING(100),                       // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      field: 'nombre',                                   // Name of column in DB
    },
    price: {
      type: DataTypes.INTEGER,                           
      allowNull: false,                                  
      field: 'precio',                                   // Name of column in DB
    },
    category: {
      type: DataTypes.STRING(150),                       // VARCHAR(150)
      allowNull: false,                                  // Not null because there is a DEFAULT
      field: 'categoria',                                // Name of column in DB
    },
    createdAt: {
      type: DataTypes.DATE,                              // TIMESTAMP
      allowNull: false,                                  // NOT NULL (tiene DEFAULT en SQL)
      field: 'created_at',                               // Name of column in DB
    }
  },
  {
    sequelize,                                           
    tableName: 'productos',                              // Name of table in DB
    timestamps: true,                                    // Activates createdAt
    freezeTableName: true,                               // Avoid plural table names
  }
);
