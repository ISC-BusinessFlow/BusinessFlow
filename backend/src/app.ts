import { PrismaClient } from '@prisma/client';
import express from 'express';
import actorController from './controller/actorController';
import flowController from './controller/flowController';
import taskController from './controller/taskController';

const app = express();
export const prisma = new PrismaClient();
app.use(express.json());

app.use('/flows', flowController);
app.use('/actors', actorController);
app.use('/tasks', taskController);

export default app;
