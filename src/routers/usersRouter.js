import { Router } from 'express';

import * as userController from '../controllers/userController.js';

const router = Router();

router.post('/sign-up', userController.register);
router.post('/sign-in', userController.login);

export default router;
