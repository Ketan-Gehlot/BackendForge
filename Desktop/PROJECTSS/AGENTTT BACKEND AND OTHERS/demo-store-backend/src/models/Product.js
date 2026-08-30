const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('products', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(200), allowNull: false, validate: { notEmpty: true } },
  slug: { type: DataTypes.STRING(250), unique: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  shortDescription: { type: DataTypes.STRING(300), field: 'short_description' },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
  compareAtPrice: { type: DataTypes.DECIMAL(10, 2), field: 'compare_at_price' },
  costPrice: { type: DataTypes.DECIMAL(10, 2), field: 'cost_price' },
  currency: { type: DataTypes.STRING(3), defaultValue: 'INR' },
  sku: { type: DataTypes.STRING(100), unique: true },
  barcode: { type: DataTypes.STRING(100) },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
  lowStockThreshold: { type: DataTypes.INTEGER, defaultValue: 5, field: 'low_stock_threshold' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_featured' },
  images: { type: DataTypes.JSONB, defaultValue: [] },
  categoryId: { type: DataTypes.UUID, field: 'category_id', references: { model: 'categories', key: 'id' } },
  tags: { type: DataTypes.JSONB, defaultValue: [] },
  weight: { type: DataTypes.FLOAT },
  dimensions: { type: DataTypes.JSONB },
  variants: { type: DataTypes.JSONB, defaultValue: [] },
  avgRating: { type: DataTypes.FLOAT, defaultValue: 0, field: 'avg_rating' },
  reviewCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'review_count' },
  metadata: { type: DataTypes.JSONB, defaultValue: {} },
}, {
  timestamps: true, paranoid: true, underscored: true,
});

Product.beforeCreate((product) => {
  if (!product.slug) {
    product.slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

module.exports = Product;
