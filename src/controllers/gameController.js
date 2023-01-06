import * as gameService from '../services/gameService.js';

async function listGames(req, res, next) {
    try {
        const result = await gameService.listGames();

        return res.send(result);
    } catch (error) {
        if (error.name === 'game') return res.status(error.status).send(error.message);

        return next(error);
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    listGames,
};
