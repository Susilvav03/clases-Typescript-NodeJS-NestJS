import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize';
import { sequelize } from '../config/database.ts';

export class User extends Model
<InferAttributes<User>, 
InferCreationAttributes<User>> 
{
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare email: string;
  declare rol: CreationOptional<'admin' | 'cliente'>;
  declare created_at: CreationOptional<Date>;
}

User.init(
  {
    id: { 
      type: DataTypes.BIGINT, 
      autoIncrement: true, 
      primaryKey: true 
    },
    nombre: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING(150), 
      allowNull: false, 
      unique: true, 
      validate: { isEmail: true } 
    },
    rol: { 
      type: DataTypes.ENUM('admin', 'cliente'), 
      allowNull: false, 
      defaultValue: 'cliente' 
    },
    created_at: { 
      type: DataTypes.DATE, 
      allowNull: false, 
      defaultValue: DataTypes.NOW 
    },
  },
  { 
    sequelize, 
    tableName: 'usuarios', 
    timestamps: false, 
    freezeTableName: true 
  }
);
