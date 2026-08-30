const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Review = sequelize.define('reviews', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' } },
  productId: { type: DataTypes.UUID, allowNull: false, field: 'product_id', references: { model: 'products', key: 'id' } },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  title: { type: DataTypes.STRING(200) },
  comment: { type: DataTypes.TEXT },
  isVerifiedPurchase: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_verified_purchase' },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_approved' },
  helpfulCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'helpful_count' },
}, { timestamps: true, paranoid: true, underscored: true,
  indexes: [{ unique: true, fields: ['user_id', 'product_id'] }],
});
module.exports = Review;
