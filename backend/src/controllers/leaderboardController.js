import { Leaderboard, User } from '../models/index.js';
import { Op } from '../server.js';

export const getLeaderboard = async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query;

    const leaderboard = await Leaderboard.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }],
      order: [['score', 'DESC'], ['level', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    for (let i = 0; i < leaderboard.length; i++) {
      leaderboard[i].rank = parseInt(offset) + i + 1;
      await leaderboard[i].save();
    }

    res.json({
      success: true,
      data: {
        leaderboard,
        total: leaderboard.length
      }
    });
  } catch (error) {
    console.error('Erro ao buscar leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar ranking',
      error: error.message
    });
  }
};

export const getTopPlayers = async (req, res) => {
  try {
    const { top = 10 } = req.query;

    const topPlayers = await Leaderboard.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }],
      order: [['score', 'DESC'], ['level', 'DESC']],
      limit: parseInt(top)
    });

    for (let i = 0; i < topPlayers.length; i++) {
      topPlayers[i].rank = i + 1;
      await topPlayers[i].save();
    }

    res.json({
      success: true,
      data: {
        top_players: topPlayers
      }
    });
  } catch (error) {
    console.error('Erro ao buscar top players:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar top jogadores',
      error: error.message
    });
  }
};

export const getMyRank = async (req, res) => {
  try {
    const myEntry = await Leaderboard.findOne({
      where: { user_id: req.user.id },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }]
    });

    if (!myEntry) {
      return res.status(404).json({
        success: false,
        message: 'Entrada no ranking não encontrada'
      });
    }

    const rank = await Leaderboard.count({
      where: {
        [Op.or]: [
          { score: { [Op.gt]: myEntry.score } },
          {
            score: myEntry.score,
            level: { [Op.gt]: myEntry.level }
          }
        ]
      }
    });

    myEntry.rank = rank + 1;
    await myEntry.save();

    const totalPlayers = await Leaderboard.count();

    const playersAbove = await Leaderboard.findAll({
      where: {
        [Op.or]: [
          { score: { [Op.gt]: myEntry.score } },
          {
            score: myEntry.score,
            level: { [Op.gt]: myEntry.level }
          }
        ]
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }],
      order: [['score', 'DESC'], ['level', 'DESC']],
      limit: 2
    });

    const playersBelow = await Leaderboard.findAll({
      where: {
        [Op.or]: [
          { score: { [Op.lt]: myEntry.score } },
          {
            score: myEntry.score,
            level: { [Op.lt]: myEntry.level }
          }
        ]
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }],
      order: [['score', 'DESC'], ['level', 'DESC']],
      limit: 2
    });

    res.json({
      success: true,
      data: {
        my_entry: myEntry,
        rank: myEntry.rank,
        total_players: totalPlayers,
        percentile: Math.round((1 - (myEntry.rank / totalPlayers)) * 100),
        nearby_players: {
          above: playersAbove,
          below: playersBelow
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar posição no ranking:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar sua posição',
      error: error.message
    });
  }
};

export const updateLeaderboard = async (userId, score, level) => {
  try {
    const entry = await Leaderboard.findOne({
      where: { user_id: userId }
    });

    if (entry) {
      entry.score = score;
      entry.level = level;
      await entry.save();
    } else {
      await Leaderboard.create({
        user_id: userId,
        score,
        level
      });
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar leaderboard:', error);
    return false;
  }
};

