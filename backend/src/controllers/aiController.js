import { AIAdaptation, PlayerProgress, EducationalContent } from '../models/index.js';
import { 
  generateHint, 
  generateQuestion, 
  analyzePerformance,
  generateExplanation,
  suggestLearningPath 
} from '../ai/aiService.js';

export const getHint = async (req, res) => {
  try {
    const { content_id } = req.body;

    const content = await EducationalContent.findByPk(content_id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Conteúdo não encontrado'
      });
    }

    const hint = await generateHint(content.question, content.difficulty);

    res.json({
      success: true,
      data: { hint }
    });
  } catch (error) {
    console.error('Erro ao gerar dica:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar dica',
      error: error.message
    });
  }
};

export const generateNewQuestion = async (req, res) => {
  try {
    const { category, difficulty, topic } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Categoria é obrigatória'
      });
    }

    const aiAdaptation = await AIAdaptation.findOne({
      where: { user_id: req.user.id }
    });

    const adaptedDifficulty = difficulty || aiAdaptation?.difficulty_level || 2;

    const question = await generateQuestion(category, adaptedDifficulty, topic);

    if (!question) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao gerar questão'
      });
    }

    const savedContent = await EducationalContent.create({
      ...question,
      stage: 0,
      points: adaptedDifficulty * 50
    });

    res.json({
      success: true,
      message: 'Questão gerada com sucesso',
      data: { 
        content: savedContent,
        ai_generated: true
      }
    });
  } catch (error) {
    console.error('Erro ao gerar questão:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar questão',
      error: error.message
    });
  }
};

export const getPerformanceAnalysis = async (req, res) => {
  try {
    const aiAdaptation = await AIAdaptation.findOne({
      where: { user_id: req.user.id }
    });

    if (!aiAdaptation || !aiAdaptation.performance_data) {
      return res.status(404).json({
        success: false,
        message: 'Dados de desempenho não encontrados'
      });
    }

    const analysis = await analyzePerformance(aiAdaptation.performance_data);

    res.json({
      success: true,
      data: {
        analysis,
        current_difficulty: aiAdaptation.difficulty_level,
        performance_data: aiAdaptation.performance_data
      }
    });
  } catch (error) {
    console.error('Erro ao analisar desempenho:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao analisar desempenho',
      error: error.message
    });
  }
};

export const getCustomExplanation = async (req, res) => {
  try {
    const { content_id, user_answer } = req.body;

    const content = await EducationalContent.findByPk(content_id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Conteúdo não encontrado'
      });
    }

    const explanation = await generateExplanation(
      content.question,
      user_answer,
      content.correct_answer
    );

    res.json({
      success: true,
      data: { 
        explanation,
        correct_answer: content.correct_answer
      }
    });
  } catch (error) {
    console.error('Erro ao gerar explicação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar explicação',
      error: error.message
    });
  }
};

export const getLearningPath = async (req, res) => {
  try {
    const progress = await PlayerProgress.findOne({
      where: { user_id: req.user.id }
    });

    const aiAdaptation = await AIAdaptation.findOne({
      where: { user_id: req.user.id }
    });

    if (!progress || !aiAdaptation) {
      return res.status(404).json({
        success: false,
        message: 'Dados não encontrados'
      });
    }

    const perfData = aiAdaptation.performance_data || {};
    const weakCategories = Object.entries(perfData.categories_performance || {})
      .filter(([_, data]) => (data.correct / data.total) < 0.5)
      .map(([category]) => category);

    const suggestions = await suggestLearningPath(
      progress.current_level,
      progress.completed_stages || [],
      weakCategories
    );

    res.json({
      success: true,
      data: {
        suggestions,
        current_level: progress.current_level,
        weak_categories: weakCategories,
        recommended_difficulty: aiAdaptation.difficulty_level
      }
    });
  } catch (error) {
    console.error('Erro ao gerar caminho de aprendizado:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar sugestões',
      error: error.message
    });
  }
};

export const adaptDifficulty = async (req, res) => {
  try {
    const aiAdaptation = await AIAdaptation.findOne({
      where: { user_id: req.user.id }
    });

    if (!aiAdaptation) {
      return res.status(404).json({
        success: false,
        message: 'Dados de adaptação não encontrados'
      });
    }

    const perfData = aiAdaptation.performance_data || {
      correct_answers: 0,
      total_answers: 0
    };

    const accuracy = perfData.total_answers > 0 
      ? perfData.correct_answers / perfData.total_answers 
      : 0.5;

    let newDifficulty = aiAdaptation.difficulty_level;

    if (accuracy < 0.4 && newDifficulty > 1) {
      newDifficulty -= 1;
    } else if (accuracy > 0.7 && newDifficulty < 5) {
      newDifficulty += 1;
    }

    aiAdaptation.difficulty_level = newDifficulty;
    await aiAdaptation.save();

    res.json({
      success: true,
      message: 'Dificuldade adaptada com sucesso',
      data: {
        previous_difficulty: aiAdaptation.difficulty_level,
        new_difficulty: newDifficulty,
        accuracy: (accuracy * 100).toFixed(1) + '%'
      }
    });
  } catch (error) {
    console.error('Erro ao adaptar dificuldade:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao adaptar dificuldade',
      error: error.message
    });
  }
};

