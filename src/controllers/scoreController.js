import * as scoreService from '../services/scoreService.js';

async function getUserScore(req, res, next) {
    try {
        return res.send();
    } catch (error) {
        if (error.name === 'scoreError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

async function getLeaderboard(req, res, next) {
    try {
        const gameId = req.params.id;

        const result = await scoreService.getLeaderboard(gameId);

        return res.send(result);
    } catch (error) {
        if (error.name === 'scoreError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

async function postUserScore(req, res, next) {
    try {
        const gameId = req.params.id;

        const userId = req.locals.id;

        const newScore = req.body.score;

        await scoreService.upsertScore({ gameId, userId, newScore });

        return res.send(200);
    } catch (error) {
        if (error.name === 'scoreError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

export {
    getUserScore,
    getLeaderboard,
    postUserScore,
};
