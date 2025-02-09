const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Vote, {
        foreignKey: 'studentId',
        as: 'studentVotes'
      });
      User.hasMany(models.Vote, {
        foreignKey: 'vendorId',
        as: 'vendorVotes'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('student', 'vendor'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });

  return User;
};