import express from 'express';

import flowController from './controller/flowController';
import taskController from './controller/taskController';

const app = express();
app.use(express.json());

app.use('/flows', flowController);
app.use('/tasks', taskController);

export default app;
