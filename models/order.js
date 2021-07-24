'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsToMany(models.Product, {
        through: models.OrderItem,
        foreignKey: 'OrderId',
        as: 'items'
      });
    }
  };
  Order.init({
    amount: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    address: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};