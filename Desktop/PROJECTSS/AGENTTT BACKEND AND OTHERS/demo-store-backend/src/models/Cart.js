const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cart = sequelize.define('carts', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, unique: true, field: 'user_id', references: { model: 'users', key: 'id' } },
  items: { type: DataTypes.JSONB, defaultValue: [] },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0, field: 'total_amount' },
}, { timestamps: true, underscored: true });

module.exports = Cart;
