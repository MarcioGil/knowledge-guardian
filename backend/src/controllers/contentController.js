import { EducationalContent, PlayerProgress, AIAdaptation } from '../models/index.js';
import { Op } from '../server.js';

export const getContent = async (req, res) => {
  try {
    const { category, difficulty, stage, limit = 10 } = req.query;

    const where = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = parseInt(difficulty);
    if (stage) where.stage = parseInt(stage);

    const content = await EducationalContent.findAll({
      where,
      order: [['difficulty', 'ASC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: {
        content,
        total: content.length
      }
    });
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar conteúdo educativo',
      error: error.message
    });
  }
};

export const getContentById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await EducationalContent.findByPk(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Conteúdo não encontrado'
      });
    }

    res.json({
      success: true,
      data: { content }
    });
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar conteúdo',
      error: error.message
    });
  }
};

export const getAdaptiveContent = async (req, res) => {
  try {
    const { stage } = req.query;

    const aiAdaptation = await AIAdaptation.findOne({
      where: { user_id: req.user.id }
    });

    const difficulty = aiAdaptation?.difficulty_level || 2;

    const content = await EducationalContent.findAll({
      where: {
        stage: parseInt(stage) || 1,
        difficulty: {
          [Op.between]: [Math.max(1, difficulty - 1), Math.min(5, difficulty + 1)]
        }
      },
      order: [['difficulty', 'ASC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        content,
        adapted_difficulty: difficulty,
        total: content.length
      }
    });
  } catch (error) {
    console.error('Erro ao buscar conteúdo adaptativo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar conteúdo adaptativo',
      error: error.message
    });
  }
};

export const validateAnswer = async (req, res) => {
  try {
    const { content_id, answer, time_taken } = req.body;

    const content = await EducationalContent.findByPk(content_id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Conteúdo não encontrado'
      });
    }

    const isCorrect = answer === content.correct_answer;

    const progress = await PlayerProgress.findOne({
      where: { user_id: req.user.id }
    });

    if (progress && isCorrect) {
      let points = content.points;

      if (time_taken && time_taken < 10) {
        points += 50;
      }

      progress.total_score += points;
      progress.experience_points += Math.floor(points / 2);
      await progress.save();
    }

    const aiAdaptation = await AIAdaptation.findOne({
      where: { user_id: req.user.id }
    });

    if (aiAdaptation) {
      const perfData = aiAdaptation.performance_data || {
        correct_answers: 0,
        total_answers: 0,
        average_time: 0,
        categories_performance: {}
      };

      perfData.total_answers += 1;
      if (isCorrect) perfData.correct_answers += 1;

      perfData.average_time = 
        ((perfData.average_time * (perfData.total_answers - 1)) + (time_taken || 0)) / 
        perfData.total_answers;

      if (!perfData.categories_performance[content.category]) {
        perfData.categories_performance[content.category] = {
          correct: 0,
          total: 0
        };
      }

      perfData.categories_performance[content.category].total += 1;
      if (isCorrect) {
        perfData.categories_performance[content.category].correct += 1;
      }

      aiAdaptation.performance_data = perfData;

      const accuracy = perfData.correct_answers / perfData.total_answers;
      if (accuracy < 0.4 && aiAdaptation.difficulty_level > 1) {
        aiAdaptation.difficulty_level -= 1;
      } else if (accuracy > 0.7 && aiAdaptation.difficulty_level < 5) {
        aiAdaptation.difficulty_level += 1;
      }

      await aiAdaptation.save();
    }

    res.json({
      success: true,
      data: {
        correct: isCorrect,
        correct_answer: content.correct_answer,
        explanation: content.explanation,
        points_earned: isCorrect ? content.points : 0,
        time_bonus: (time_taken && time_taken < 10 && isCorrect) ? 50 : 0
      }
    });
  } catch (error) {
    console.error('Erro ao validar resposta:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao validar resposta',
      error: error.message
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await EducationalContent.findAll({
      attributes: ['category'],
      group: ['category']
    });

    const categoryList = categories.map(c => c.category);

    res.json({
      success: true,
      data: {
        categories: categoryList
      }
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar categorias',
      error: error.message
    });
  }
};

