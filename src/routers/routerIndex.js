import { Router } from 'express';

import usersRouter from './usersRouter.js';
import gamesRouter from './gamesRouter.js';

const router = Router();

// STATUS CHECK
router.get('/health', (req, res) => {
    res.send('OK!');
});

// ROUTES
router.use('/users', usersRouter);
router.use('/games', gamesRouter);

// REDIRECT
router.all('/*', (req, res) => {
    res.sendStatus(501);
});

export default router;
