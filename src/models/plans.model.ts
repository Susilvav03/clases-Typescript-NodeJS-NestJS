import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';                                      
import { sequelize } from '../config/database.ts';          


export class Plan extends Model<
  InferAttributes<Plan>,             // Existing attributes in the instance
  InferCreationAttributes<Plan>      // Attributes needed to create a new instance
> {
  declare id: CreationOptional<number>; // SERIAL → autoincrement (
  declare name: CreationOptional<string>; // DEFAULT                             
  declare price: number;                              
  declare maxBooks: number;                          
  declare description: string | null;  // Nullable
  declare createdAt: CreationOptional<Date>;  // Map created_at
  declare updatedAt: CreationOptional<Date>;  // Map updated_at
}

// Intitialization: define table and columns
Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,                           // SERIAL → INTEGER
      autoIncrement: true,                               // Autoincrement
      primaryKey: true,                                  // PRIMARY KEY
    },
    name: {
      type: DataTypes.STRING(100),                       // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      field: 'name',                                     // Name of column in DB
    },
    price: {
      type: DataTypes.INTEGER,                           // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      field: 'price',                                    // Name of column in DB
    },
    maxBooks: {
      type: DataTypes.INTEGER,                           // VARCHAR(150)
      allowNull: false,                                  // NOT NULL
      field: 'max_books_per_month',                      // Name of column in DB
     
    },
    description: {
      type: DataTypes.TEXT,                              // TEXT
      field: 'description',                              // Name of column in DB
    },
    createdAt: {
      type: DataTypes.DATE,                              // TIMESTAMP
      allowNull: false,                                  // NOT NULL (tiene DEFAULT en SQL)
      field: 'created_at',                               // Name of column in DB
    },
    updatedAt: {
      type: DataTypes.DATE,                              // TIMESTAMP
      allowNull: false,                                  // NOT NULL (DEFAULT NOW())
      field: 'updated_at',                               // Name of column in DB
    },
  },
  {
    sequelize,                                           
    tableName: 'plans',                                  // Name of table in DB
    timestamps: true,                                    // Activates createdAt/updatedAt 
    underscored: true,                                   // snake_case in FK
    freezeTableName: true,                               // Avoid plural table names
  }
);
