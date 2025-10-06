import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';                                      
import { sequelize } from '../config/database.ts';          


export class User extends Model<
  InferAttributes<User>,             // Existing attributes in the instance
  InferCreationAttributes<User>      // Attributes needed to create a new instance
> {
  declare id: CreationOptional<number>; // SERIAL → autoincrement (
  declare name: string;                            
  declare email: string; // UNIQUE NOT NULL
  declare role: CreationOptional<string>; // DEFAULT 'cliente' 
  declare createdAt: CreationOptional<Date>;  // Map created_at
}

// Intitialization: define table and columns
User.init(
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
    email: {
      type: DataTypes.STRING(150),                       // VARCHAR(150)
      allowNull: false,                                  // NOT NULL
      unique: true,                                      // UNIQUE (reflects constraint SQL)
      field: 'email',                                    // Name of column in DB
      validate: { isEmail: true },                       
    },
    role: {
      type: DataTypes.STRING(20),                        // VARCHAR(20)
      allowNull: false,                                  // Not null because there is a DEFAULT
      defaultValue: 'cliente',                           // DEFAULT 'user'
      field: 'rol',                                      // Name of column in DB
    },
    createdAt: {
      type: DataTypes.DATE,                              // TIMESTAMP
      allowNull: false,                                  // NOT NULL (tiene DEFAULT en SQL)
      field: 'created_at',                               // Name of column in DB
    },
  },
  {
    sequelize,                                           
    tableName: 'usuarios',                               // Name of table in DB
    timestamps: true,                                    // Activates createdAt/updatedAt 
    underscored: true,                                   // snake_case in FK
    freezeTableName: true,                               // Avoid plural table names
  }
);
