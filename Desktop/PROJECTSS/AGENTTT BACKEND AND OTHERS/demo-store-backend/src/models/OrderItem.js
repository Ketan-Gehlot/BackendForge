const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OrderItem = sequelize.define('order_items', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  orderId: { type: DataTypes.UUID, allowNull: false, field: 'order_id', references: { model: 'orders', key: 'id' } },
  productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id', references: { model: 'products', key: 'id' } },
  name: { type: DataTypes.STRING(200), allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
  image: { type: DataTypes.STRING(500) },
  variant: { type: DataTypes.JSONB },
}, { timestamps: true, underscored: true });

module.exports = OrderItem;
