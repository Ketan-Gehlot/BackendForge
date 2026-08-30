const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const AuditLog = sequelize.define('audit_logs', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  adminId: { type: DataTypes.UUID, allowNull: false, field: 'admin_id' },
  adminEmail: { type: DataTypes.STRING(255), field: 'admin_email' },
  action: { type: DataTypes.STRING(100), allowNull: false },
  targetModel: { type: DataTypes.STRING(50), field: 'target_model' },
  targetId: { type: DataTypes.STRING(100), field: 'target_id' },
  changes: { type: DataTypes.JSONB },
  ip: { type: DataTypes.STRING(45) },
  userAgent: { type: DataTypes.TEXT, field: 'user_agent' },
  metadata: { type: DataTypes.JSONB, defaultValue: {} },
}, { timestamps: true, underscored: true });
module.exports = AuditLog;
