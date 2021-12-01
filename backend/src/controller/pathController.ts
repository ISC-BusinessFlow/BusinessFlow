import { Request, Response, Router } from 'express';
import { prisma } from '../app';

const router = Router();

// POST /paths
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      flow_id: flowId,
      type_id: pathTypeId,
      from_task_id: fromTaskId,
      to_task_id: toTaskId,
    } = req.body;

    const path = await prisma.path.create({
      data: {
        flowId,
        pathTypeId,
        fromTaskId,
        toTaskId,
      },
    });
    res.status(201).send(path);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// GET /paths/{path_id}
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const path = await prisma.path.findUnique({
      where: { id: parseInt(req.params?.id) },
    });

    if (!path) {
      res.status(400).send(`There is no path with id ${req.params?.id}`);
      return;
    }

    res.status(200).send(path);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// DELETE /paths/{path_id}
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const task = await prisma.path.delete({
      where: { id: parseInt(req.params?.id) },
    });

    res.status(200).json(task);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// PUT /paths/{path_id}
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const {
      type_id: pathTypeId,
      from_task_id: fromTaskId,
      to_task_id: toTaskId,
    } = req.body;
    const path = await prisma.path.findUnique({
      where: { id: parseInt(req.params?.id) },
    });

    if (!path) {
      res.status(400).send(`There is no path with id ${req.params?.id}`);
      return;
    }

    const updatedFlow = await prisma.path.update({
      where: {
        id: parseInt(req.params?.id),
      },
      data: {
        pathTypeId,
        fromTaskId,
        toTaskId,
      },
    });

    res.status(200).json(updatedFlow);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

export default router;
