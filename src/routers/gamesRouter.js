import { Router } from 'express';

import * as scoreController from '../controllers/scoreController.js';

const router = Router();

router.get('/:id/score', scoreController.getUserScore);
router.get('/:id/leaderboard', scoreController.getLeaderboard);
