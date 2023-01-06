import { Router } from 'express';

import * as scoreController from '../controllers/scoreController.js';
import * as gameController from '../controllers/gameController.js';

const router = Router();

router.get('/games', gameController.listGames);
router.get('/:id/score', scoreController.getUserScore);
router.post('/:id/score', scoreController.postUserScore);
router.get('/:id/leaderboard', scoreController.getLeaderboard);

export default router;
