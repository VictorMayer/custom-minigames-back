import express from 'express';
import cors from 'cors';
import faker from 'faker-br';
import serverError from './middlewares/serverError.js';

import * as userController from './controllers/userController.js';

const app = express();

app.use(express.json());
app.use(cors());

// STATUS CHECK
app.post('/health', async (req, res) => {
    res.send('OK!');
});

app.get('/fakes', async (req, res) => {
    const result = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
    };
    console.log(result);
    return res.send(result);
});

// ROUTES
app.post('/sign-up', userController.register);
app.post('/sign-in', userController.login);

app.use(serverError);

export default app;
