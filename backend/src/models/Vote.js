const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      Vote.belongsTo(models.User, {
        foreignKey: 'studentId',
        as: 'student'
      });
      Vote.belongsTo(models.User, {
        foreignKey: 'vendorId',
        as: 'vendor'
      });
    }
  }

  Vote.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    vendorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    votingPeriod: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Vote',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['studentId', 'votingPeriod']
      }
    ]
  });

  return Vote;
};