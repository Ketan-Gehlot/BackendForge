const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Address = sequelize.define('addresses', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' } },
  label: { type: DataTypes.STRING(50), defaultValue: 'Home' },
  street: { type: DataTypes.STRING(500), allowNull: false },
  city: { type: DataTypes.STRING(100), allowNull: false },
  state: { type: DataTypes.STRING(100), allowNull: false },
  zipCode: { type: DataTypes.STRING(20), allowNull: false, field: 'zip_code' },
  country: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'India' },
  isDefault: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_default' },
  phone: { type: DataTypes.STRING(20) },
}, { timestamps: true, underscored: true });

module.exports = Address;
