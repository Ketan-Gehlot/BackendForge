const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('categories', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  slug: { type: DataTypes.STRING(120), unique: true },
  description: { type: DataTypes.TEXT },
  parentId: { type: DataTypes.UUID, field: 'parent_id', references: { model: 'categories', key: 'id' } },
  image: { type: DataTypes.STRING(500) },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  sortOrder: { type: DataTypes.INTEGER, defaultValue: 0, field: 'sort_order' },
}, { timestamps: true, paranoid: true, underscored: true });

Category.beforeCreate((cat) => {
  if (!cat.slug) cat.slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
});
module.exports = Category;
