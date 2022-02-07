import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

import actorController from './controller/actorController';
import flowController from './controller/flowController';
import pathController from './controller/pathController';
import taskController from './controller/taskController';
import { corsOptions } from './corsOptions';
import relation from './routes/relation';

const app = express();
export const prisma = new PrismaClient();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/flows', flowController);
app.use('/actors', actorController);
app.use('/tasks', taskController);
app.use('/paths', pathController);
app.use('/relations', relation);

export default app;
