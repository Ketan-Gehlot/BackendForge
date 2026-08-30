const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const OTP = sequelize.define('otps', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
  code: { type: DataTypes.STRING(10), allowNull: false },
  channel: { type: DataTypes.ENUM('email', 'sms', 'both'), defaultValue: 'both' },
  purpose: { type: DataTypes.ENUM('admin_login', 'verify_email', 'verify_phone', 'password_reset'), defaultValue: 'admin_login' },
  expiresAt: { type: DataTypes.DATE, allowNull: false, field: 'expires_at' },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  maxAttempts: { type: DataTypes.INTEGER, defaultValue: 5, field: 'max_attempts' },
}, { timestamps: true, underscored: true });
module.exports = OTP;
