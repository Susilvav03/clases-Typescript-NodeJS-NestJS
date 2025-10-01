import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';                                      
import { sequelize } from '../config/database.ts';          


export class Book extends Model<
  InferAttributes<Book>,             // Existing attributes in the instance
  InferCreationAttributes<Book>      // Attributes needed to create a new instance
> {
  declare id: CreationOptional<number>; // SERIAL → autoincrement (
  declare title: string;                                  
  declare author: string;                              
  declare isbn: string | null;
  declare genre: string | null;                          
  declare language: string| null;
  declare coverURL: string | null; // Nullable
  declare description: string | null;
  declare ownerId: number; // Foreign key to users table
  declare status: CreationOptional<string>; // DEFAULT 'available'
  declare createdAt: CreationOptional<Date>;  // Map created_at
  declare updatedAt: CreationOptional<Date>;  // Map updated_at
}

// Intitialization: define table and columns
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,                           // SERIAL → INTEGER
      autoIncrement: true,                               // Autoincrement
      primaryKey: true,                                  // PRIMARY KEY
    },
    title: {
      type: DataTypes.STRING(100),                       // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      field: 'title',                                    // Name of column in DB
    },
    author: {
      type: DataTypes.STRING(100),                       // VARCHAR(100)
      allowNull: false,                                  // NOT NULL
      field: 'author',                                   // Map camelCase → snake_case
    },
    isbn: {
      type: DataTypes.STRING(150),                       // VARCHAR(150)
      unique: true,                                      // UNIQUE (reflects constraint SQL)
      field: 'isbn',                                     // Name of column in DB
    },
    genre: {
      type: DataTypes.TEXT,                              // TEXT
      allowNull: false,                                  // NOT NULL
      field: 'genre',                                    // Name of column in DB
    },
    language: {
      type: DataTypes.STRING(50),                        // VARCHAR(20)
      field: 'language',                                 // Name of column in DB
    },
    coverURL: {
      type: DataTypes.TEXT,                              // TEXT
      field: 'cover_url',                                // Name of column in DB
    },
    description: {
      type: DataTypes.TEXT,                              // VARCHAR(20)
      field: 'description',                              // Name of column in DB
    },
    ownerId: {
      type: DataTypes.INTEGER,                           // VARCHAR(20)
      allowNull: false,                                  // Not null because there is a DEFAULT
      field: 'owner_id',                                 // Name of column in DB
    },
    status: {
      type: DataTypes.STRING(150),                       // VARCHAR(20)
      allowNull: false,                                  // Not null because there is a DEFAULT
      defaultValue: 'Available',                         // DEFAULT 'user'
      field: 'status',                                     // Name of column in DB
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
    underscored: true,                                   // snake_case in FK
    freezeTableName: true,                               // Avoid plural table names
  }
);
