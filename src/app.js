import express from 'express';
import cors from 'cors';
import serverError from './middlewares/serverError.js';
import router from './routers/routerIndex.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(serverError);

export default app;
