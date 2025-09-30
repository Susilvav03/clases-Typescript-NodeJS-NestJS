import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';                                      
import { sequelize } from '../config/database.ts';          


export class User extends Model<
  InferAttributes<User>,             // Existing attributes in the instance
  InferCreationAttributes<User>      // Attributes needed to create a new instance
> {
  declare id: CreationOptional<number>; // SERIAL → autoincrement (
  declare name: string;                                  
  declare lastName: string;                              
  declare email: string; // UNIQUE NOT NULL
  declare passwordHash: string;                          
  declare phone: string | null;  // Nullable
  declare address: string | null; // Nullable
  declare role: CreationOptional<string>; // DEFAULT 'user' 
  declare createdAt: CreationOptional<Date>;  // Map created_at
  declare updatedAt: CreationOptional<Date>;  // Map updated_at
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
      field: 'name',                                     // Name of column in DB
    },
    lastName: {
      type: DataTypes.STRING(100),                       // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      field: 'last_name',                                // Map camelCase → snake_case
    },
    email: {
      type: DataTypes.STRING(150),                       // VARCHAR(150)
      allowNull: false,                                  // NOT NULL
      unique: true,                                      // UNIQUE (reflects constraint SQL)
      field: 'email',                                    // Name of column in DB
      validate: { isEmail: true },                       
    },
    passwordHash: {
      type: DataTypes.TEXT,                              // TEXT
      allowNull: false,                                  // NOT NULL
      field: 'password_hash',                            // Name of column in DB
    },
    phone: {
      type: DataTypes.STRING(20),                        // VARCHAR(20)
      allowNull: true,                                   // Nullable
      field: 'phone',                                    // Name of column in DB
    },
    address: {
      type: DataTypes.TEXT,                              // TEXT
      allowNull: true,                                   // Nullable
      field: 'address',                                  // Name of column in DB
    },
    role: {
      type: DataTypes.STRING(20),                        // VARCHAR(20)
      allowNull: false,                                  // Not null because there is a DEFAULT
      defaultValue: 'user',                              // DEFAULT 'user'
      field: 'role',                                     // Name of column in DB
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
    tableName: 'users',                                  // Name of table in DB
    timestamps: true,                                    // Activates createdAt/updatedAt 
    createdAt: 'created_at',                             // Name of column in DB
    updatedAt: 'updated_at',                             // Name of column in DB
    underscored: true,                                   // snake_case in FK
    freezeTableName: true,                               // Avoid plural table names
  }
);
