const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('payments', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  orderId: { type: DataTypes.UUID, allowNull: false, field: 'order_id', references: { model: 'orders', key: 'id' } },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' } },
  gateway: { type: DataTypes.ENUM('stripe', 'razorpay', 'paypal'), allowNull: false },
  gatewayPaymentId: { type: DataTypes.STRING(255), field: 'gateway_payment_id' },
  gatewayOrderId: { type: DataTypes.STRING(255), field: 'gateway_order_id' },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  currency: { type: DataTypes.STRING(3), defaultValue: 'INR' },
  status: {
    type: DataTypes.ENUM('created', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded'),
    defaultValue: 'created',
  },
  method: { type: DataTypes.STRING(50) },
  refundAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0, field: 'refund_amount' },
  refundId: { type: DataTypes.STRING(255), field: 'refund_id' },
  refundReason: { type: DataTypes.TEXT, field: 'refund_reason' },
  metadata: { type: DataTypes.JSONB, defaultValue: {} },
}, { timestamps: true, paranoid: true, underscored: true });

module.exports = Payment;
