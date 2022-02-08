import express from 'express';
import cors from 'cors';
import serverError from './middlewares/serverError.js';

import * as userController from './controllers/userController.js';

const app = express();

app.use(express.json());
app.use(cors());

// STATUS CHECK
app.post('/health', async (req, res) => {
    res.send('OK!');
});

// ROUTES
app.post('/sign-up', userController.register);
app.post('/sign-in', userController.login);

app.use(serverError);

export default app;
