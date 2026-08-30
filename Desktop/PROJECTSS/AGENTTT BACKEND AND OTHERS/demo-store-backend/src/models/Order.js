const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('orders', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: { model: 'users', key: 'id' },
  },
  orderNumber: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    field: 'order_number',
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  shippingCost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    field: 'shipping_cost',
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_amount',
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'INR',
  },

  // Payment
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'processing', 'paid', 'failed', 'refunded', 'partially_refunded'),
    defaultValue: 'pending',
    field: 'payment_status',
  },
  paymentMethod: { type: DataTypes.STRING(50), field: 'payment_method' },
  paymentGateway: { type: DataTypes.STRING(50), field: 'payment_gateway' },
  gatewayOrderId: { type: DataTypes.STRING(255), field: 'gateway_order_id' },
  gatewayPaymentId: { type: DataTypes.STRING(255), field: 'gateway_payment_id' },

  // Shipping
  shippingStatus: {
    type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'packed', 'shipped', 'in_transit', 'out_for_delivery', 'delivered', 'returned'),
    defaultValue: 'pending',
    field: 'shipping_status',
  },
  trackingNumber: { type: DataTypes.STRING(100), field: 'tracking_number' },
  carrier: { type: DataTypes.STRING(100) },
  estimatedDelivery: { type: DataTypes.DATE, field: 'estimated_delivery' },

  // Shipping Address (denormalized for order history)
  shippingStreet: { type: DataTypes.STRING(500), field: 'shipping_street' },
  shippingCity: { type: DataTypes.STRING(100), field: 'shipping_city' },
  shippingState: { type: DataTypes.STRING(100), field: 'shipping_state' },
  shippingZipCode: { type: DataTypes.STRING(20), field: 'shipping_zip_code' },
  shippingCountry: { type: DataTypes.STRING(100), field: 'shipping_country', defaultValue: 'India' },

  // Cancellation
  isCancelled: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_cancelled' },
  cancelledAt: { type: DataTypes.DATE, field: 'cancelled_at' },
  cancelReason: { type: DataTypes.TEXT, field: 'cancel_reason' },
  cancelledBy: { type: DataTypes.ENUM('customer', 'admin'), field: 'cancelled_by' },

  // Notes
  customerNotes: { type: DataTypes.TEXT, field: 'customer_notes' },
  adminNotes: { type: DataTypes.TEXT, field: 'admin_notes' },
}, {
  timestamps: true,
  paranoid: true,
  underscored: true,
});

// Auto-generate order number
Order.beforeCreate(async (order) => {
  if (!order.orderNumber) {
    const count = await Order.count();
    order.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(5, '0')}`;
  }
});

module.exports = Order;
