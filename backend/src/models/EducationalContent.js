import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EducationalContent = sequelize.define('EducationalContent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['matematica', 'historia', 'ciencias', 'geografia', 'portugues']]
    }
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  correct_answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  options: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isValidOptions(value) {
        if (!Array.isArray(value) || value.length !== 4) {
          throw new Error('Options deve ser um array com 4 opções');
        }
      }
    }
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  stage: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  }
}, {
  tableName: 'educational_content',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default EducationalContent;

