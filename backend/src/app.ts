import express from 'express';
import actorController from './controller/actorController';
import flowController from './controller/flowController';

const app = express();
app.use(express.json());

app.use('/flows', flowController);
app.use('/actors', actorController);

export default app;
