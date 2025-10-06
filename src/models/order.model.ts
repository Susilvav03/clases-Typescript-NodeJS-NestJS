import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';                                      
import { sequelize } from '../config/database.ts';          


export class Order extends Model<
  InferAttributes<Order>,             // Existing attributes in the instance
  InferCreationAttributes<Order>      // Attributes needed to create a new instance
> {
  declare id: CreationOptional<number>; // SERIAL → autoincrement (
  declare date: Date;     
  declare status?: CreationOptional<string>; // DEFAULT 'pendiente'                      
  declare userId: number; 
  declare createdAt: CreationOptional<Date>;  // Map created_at
}

// Intitialization: define table and columns
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,                           // SERIAL → INTEGER
      autoIncrement: true,                               // Autoincrement
      primaryKey: true,                                  // PRIMARY KEY
    },
    date: {
      type: DataTypes.DATE,                              // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      field: 'fecha',                                    // Name of column in DB
    },
    status: {
      type: DataTypes.INTEGER,                           // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      defaultValue: 'pendiente',                         // DEFAULT 'pendiente'
      field: 'estado',                                   // Name of column in DB
    },
    userId: {
      type: DataTypes.INTEGER,                           // VARCHAR(150)
      allowNull: false,                                  // NOT NULL
      field: 'usuario_id',                               // Name of column in DB
     
    },
    createdAt: {
      type: DataTypes.DATE,                              // TIMESTAMP
      allowNull: false,                                  // NOT NULL (tiene DEFAULT en SQL)
      field: 'created_at',                               // Name of column in DB
      defaultValue: DataTypes.NOW,                       // DEFAULT NOW()
    }
  },
  {
    sequelize,                                           
    tableName: 'pedidos',                                 // Name of table in DB
    timestamps: false,                                   // Activates createdAt/updatedAt 
    freezeTableName: true,                               // Avoid plural table names
  }
);

export class OrderProducts extends Model<
  InferAttributes<OrderProducts>,             // Existing attributes in the instance
  InferCreationAttributes<OrderProducts>      // Attributes needed to create a new instance
> {
  declare orderId: number;
  declare productId: number;
  declare quantity: number;
  declare createdAt: CreationOptional<Date>;  // Map created_at
}

// Intitialization: define table and columns
OrderProducts.init(
  {
    orderId: {
      type: DataTypes.INTEGER,                           // SERIAL → INTEGER
      allowNull: false,                                  // NOT NULL
      primaryKey: true,                                  // PRIMARY KEY
      field: 'pedido_id',                                // Name of column in DB
    },
    productId: {
      type: DataTypes.INTEGER,                           // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      primaryKey: true,                                  // PRIMARY KEY
      field: 'producto_id',                              // Name of column in DB
    },
    quantity: {
      type: DataTypes.INTEGER,                           // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      field: 'cantidad',                                 // Name of column in DB
    },
    createdAt: {
      type: DataTypes.DATE,                              // TIMESTAMP
      allowNull: false,                                  // NOT NULL (tiene DEFAULT en SQL)
      field: 'created_at',                               // Name of column in DB
      defaultValue: DataTypes.NOW,                       // DEFAULT NOW()
    }
  },
  {
    sequelize,                                           
    tableName: 'pedido_productos',                       // Name of table in DB
    timestamps: false,                                   // Activates createdAt/updatedAt 
    freezeTableName: true,                               // Avoid plural table names
  }
);
