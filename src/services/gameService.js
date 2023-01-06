import GameError from '../errors/GameError.js';

import * as gameRepository from '../repositories/gameRepository.js';

async function listGames() {
    const games = await gameRepository.getGames();

    if (!games) throw new GameError('No games found', 404);

    return games;
}

export {
    // eslint-disable-next-line import/prefer-default-export
    listGames,
};
