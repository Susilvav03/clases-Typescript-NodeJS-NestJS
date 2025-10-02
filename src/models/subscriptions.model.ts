import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';                                      
import { sequelize } from '../config/database.ts';          


export class Subscription extends Model<
  InferAttributes<Subscription>,             // Existing attributes in the instance
  InferCreationAttributes<Subscription>      // Attributes needed to create a new instance
> {
  declare id: CreationOptional<number>; // SERIAL → autoincrement (
  declare userId: number;  // Foreign key to Subscription
  declare planId: number;  // Foreign key to Plan
  declare startDate: Date; // Start date of the subscription
  declare endDate?: Date | null;   // End date of the subscription
  declare status?: CreationOptional<string>; // DEFAULT 'active'
  declare createdAt: CreationOptional<Date>;  // Map created_at
  declare updatedAt: CreationOptional<Date>;  // Map updated_at
}                                

// Intitialization: define table and columns
Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,                           // SERIAL → INTEGER
      autoIncrement: true,                               // Autoincrement
      primaryKey: true,                                  // PRIMARY KEY
    },
    userId: {
      type: DataTypes.INTEGER,                           
      allowNull: false,                                  // NOT NULL
      field: 'user_id',                                  // Name of column in DB
    },
    planId: {
      type: DataTypes.INTEGER,                         
      allowNull: false,                                  // NOT NULL
      field: 'plan_id',                                  // Name of column in DB
    },
    startDate: {
      type: DataTypes.DATE,                               
      allowNull: false,                                  // NOT NULL
      field: 'start_date',                               // Name of column in DB                      
    },
    endDate: {
      type: DataTypes.DATE,                              
      field: 'end_date',                                 // Name of column in DB
    },
    status: {
      type: DataTypes.STRING(20),                        // VARCHAR(20)
      allowNull: false,                                  // Not null because there is a DEFAULT
      defaultValue: 'active',                            // DEFAULT 'Subscription'
      field: 'status',                                   // Name of column in DB
    },
    createdAt: {
      type: DataTypes.DATE,                              // TIMESTAMP
      allowNull: false,                                  // NOT NULL (tiene DEFAULT NOW())
      field: 'created_at',                               // Name of column in DB
      defaultValue: DataTypes.NOW,                       // DEFAULT NOW()
    },
    updatedAt: {
      type: DataTypes.DATE,                              // TIMESTAMP
      allowNull: false,                                  // NOT NULL (DEFAULT NOW())
      field: 'updated_at',                               // Name of column in DB
      defaultValue: DataTypes.NOW,                       // DEFAULT NOW()
    },
  },
  {
    sequelize,                                           
    tableName: 'Subscriptions',                                  // Name of table in DB
    timestamps: false,                                   // Activates createdAt/updatedAt 
    underscored: true,                                   // snake_case in FK
    freezeTableName: true,                               // Avoid plural table names
  }
);
