import ScoreError from '../errors/ScoreError.js';

import * as scoreRepository from '../repositories/scoreRepository.js';

async function getLeaderboard(gameId) {
    const result = await scoreRepository.getLeaderboard(gameId);

    if (!result.length) throw new ScoreError('No scores have been registered for this game yet!', 404);

    return result;
}

async function getUserScore({ gameId, userId }) {
    const score = await scoreRepository.getUserScore({ gameId, userId });

    if (!score) throw new ScoreError('You are not in this leaderboard', 404);

    return score;
}

async function upsertScore({ newScore, userId, gameId }) {
    const oldScore = await scoreRepository.getUserScore({ userId, gameId });

    if (!oldScore || newScore > oldScore.value) await scoreRepository.updateScore({ newScore, userId });

    return true;
}

export {
    getLeaderboard,
    getUserScore,
    upsertScore,
};
