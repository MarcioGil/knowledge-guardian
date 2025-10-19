import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Leaderboard = sequelize.define('Leaderboard', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  rank: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'leaderboard',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at'
});

// Relacionamento
User.hasOne(Leaderboard, { foreignKey: 'user_id', as: 'leaderboard' });
Leaderboard.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Leaderboard;

