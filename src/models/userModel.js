const { DataTypes } = require("sequelize")
const { sequelize} = require("../db")
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    passwordHash :{
        type: DataTypes.STRING,
        allowNull:false,
        
    },

    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate: {
        isEmail: true,
      }
    },
    role: {
        type: DataTypes.ENUM(["user","admin"]),
        defaultValue:"user",
        allowNull:false,
    },
    createdAt: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull:false
    },
    updatedAt: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull:false
    }
  }
)

module.exports = User;