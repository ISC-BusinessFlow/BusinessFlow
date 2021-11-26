import { Request, Response, Router } from 'express';

import { prisma } from '../app';

const router = Router();

// POST /tasks
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      flow_id: flowId,
      name,
      task_id: typeId,
      actor_id: actorId,
    } = req.body;

    const tasks = await prisma.task.create({
      data: {
        flowId,
        name,
        typeId,
        actorId,
      },
    });
    res.status(200).send(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// GET /tasks/{task_id}
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params?.id) },
    });

    if (!task) {
      res.status(400).send(`There is no task with id ${req.params?.id}`);
      return;
    }

    res.status(200).send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// DELETE /tasks/{task_id}
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.delete({
      where: { id: parseInt(req.params?.id) },
    });

    res.status(200).json(task);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// PUT /tasks/{task_id}
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, task_id: typeId, actor_id: actorId } = req.body;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params?.id) },
    });

    if (!task) {
      res.status(400).send(`There is no task with id ${req.params?.id}`);
      return;
    }

    const actor = await prisma.actor.findUnique({
      where: {
        id: actorId,
      },
    });

    if (!actor || actor?.flowId !== task.flowId) {
      res.status(400).send(`actor_id is invalid.`);
      return;
    }

    const updatedFlow = await prisma.task.update({
      where: {
        id: parseInt(req.params?.id),
      },
      data: {
        name,
        typeId,
        actorId,
      },
    });

    res.status(200).json(updatedFlow);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

export default router;
