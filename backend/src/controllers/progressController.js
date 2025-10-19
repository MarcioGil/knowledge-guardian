import { PlayerProgress, Leaderboard } from '../models/index.js';

export const getProgress = async (req, res) => {
  try {
    const progress = await PlayerProgress.findOne({
      where: { user_id: req.user.id }
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progresso não encontrado'
      });
    }

    res.json({
      success: true,
      data: { progress }
    });
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar progresso',
      error: error.message
    });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { total_score, experience_points, current_level, current_stage } = req.body;

    const progress = await PlayerProgress.findOne({
      where: { user_id: req.user.id }
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progresso não encontrado'
      });
    }

    if (total_score !== undefined) progress.total_score = total_score;
    if (experience_points !== undefined) progress.experience_points = experience_points;
    if (current_level !== undefined) progress.current_level = current_level;
    if (current_stage !== undefined) progress.current_stage = current_stage;

    await progress.save();

    await Leaderboard.update(
      { 
        score: progress.total_score,
        level: progress.current_level
      },
      { where: { user_id: req.user.id } }
    );

    res.json({
      success: true,
      message: 'Progresso atualizado com sucesso',
      data: { progress }
    });
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar progresso',
      error: error.message
    });
  }
};

export const completeStage = async (req, res) => {
  try {
    const { stage_number, score, artifacts } = req.body;

    const progress = await PlayerProgress.findOne({
      where: { user_id: req.user.id }
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progresso não encontrado'
      });
    }

    const completedStages = progress.completed_stages || [];
    if (!completedStages.includes(stage_number)) {
      completedStages.push(stage_number);
      progress.completed_stages = completedStages;
    }

    progress.total_score += score || 500;
    progress.experience_points += 200;

    if (artifacts && Array.isArray(artifacts)) {
      const currentArtifacts = progress.artifacts_collected || [];
      progress.artifacts_collected = [...new Set([...currentArtifacts, ...artifacts])];
    }

    const xpThreshold = progress.current_level * 1000;
    if (progress.experience_points >= xpThreshold) {
      progress.current_level += 1;
      progress.current_stage = stage_number + 1;
    }

    await progress.save();

    await Leaderboard.update(
      { 
        score: progress.total_score,
        level: progress.current_level
      },
      { where: { user_id: req.user.id } }
    );

    res.json({
      success: true,
      message: 'Fase completada com sucesso',
      data: { 
        progress,
        level_up: progress.experience_points >= xpThreshold
      }
    });
  } catch (error) {
    console.error('Erro ao completar fase:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao completar fase',
      error: error.message
    });
  }
};

export const collectArtifact = async (req, res) => {
  try {
    const { artifact_id } = req.body;

    const progress = await PlayerProgress.findOne({
      where: { user_id: req.user.id }
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progresso não encontrado'
      });
    }

    const artifacts = progress.artifacts_collected || [];
    
    if (artifacts.includes(artifact_id)) {
      return res.status(400).json({
        success: false,
        message: 'Artefato já coletado'
      });
    }

    artifacts.push(artifact_id);
    progress.artifacts_collected = artifacts;
    progress.total_score += 200;
    progress.experience_points += 50;

    await progress.save();

    await Leaderboard.update(
      { score: progress.total_score },
      { where: { user_id: req.user.id } }
    );

    res.json({
      success: true,
      message: 'Artefato coletado com sucesso',
      data: { progress }
    });
  } catch (error) {
    console.error('Erro ao coletar artefato:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao coletar artefato',
      error: error.message
    });
  }
};

