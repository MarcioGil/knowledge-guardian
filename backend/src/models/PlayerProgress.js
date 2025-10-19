import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const PlayerProgress = sequelize.define('PlayerProgress', {
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
  current_level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  total_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  experience_points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  artifacts_collected: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  completed_stages: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  current_stage: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'player_progress',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relacionamento
User.hasOne(PlayerProgress, { foreignKey: 'user_id', as: 'progress' });
PlayerProgress.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default PlayerProgress;

