import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Achievement = sequelize.define('Achievement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  achievement_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  achievement_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: '🏆'
  },
  unlocked_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'achievements',
  timestamps: false
});

// Relacionamento
User.hasMany(Achievement, { foreignKey: 'user_id', as: 'achievements' });
Achievement.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Achievement;

