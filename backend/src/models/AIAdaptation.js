import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const AIAdaptation = sequelize.define('AIAdaptation', {
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
  performance_data: {
    type: DataTypes.JSON,
    defaultValue: {
      correct_answers: 0,
      total_answers: 0,
      average_time: 0,
      categories_performance: {}
    }
  },
  difficulty_level: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
    validate: {
      min: 1,
      max: 5
    }
  },
  recommended_content: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  learning_style: {
    type: DataTypes.STRING,
    defaultValue: 'balanced'
  }
}, {
  tableName: 'ai_adaptations',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at'
});

// Relacionamento
User.hasOne(AIAdaptation, { foreignKey: 'user_id', as: 'ai_adaptation' });
AIAdaptation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default AIAdaptation;

