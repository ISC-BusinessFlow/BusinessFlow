import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const router = Router();

// GET /flows
router.get('/', async (req: Request, res: Response) => {
  try {
    const flows = await prisma.flow.findMany();
    res.status(200).json(flows);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// GET /flows/{flow_id}
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const flow = await prisma.flow.findUnique({
      where: { id: parseInt(req.params?.id) },
    });
    if (!flow) {
      res.status(400).send(`There is no flow with id ${req.params?.id}`);
      return;
    }
    res.status(200).json(flow);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// POST /flows
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const flow = await prisma.flow.create({
      data: {
        name: name,
      },
    });
    res.status(201).json(flow);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// DELETE /flows/{flow_id}
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const flow = await prisma.flow.delete({
      where: { id: parseInt(req.params?.id) },
    });

    res.status(200).json(flow);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// PUT /flows/{flow_id}
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const flow = await prisma.flow.findUnique({
      where: { id: parseInt(req.params?.id) },
    });

    if (!flow) {
      res.status(400).send(`There is no flow with id ${req.params?.id}`);
      return;
    }

    const updatedFlow = await prisma.flow.update({
      where: {
        id: parseInt(req.params?.id),
      },
      data: {
        name: name,
      },
    });

    res.status(200).json(updatedFlow);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// GET /flows/{flow_id}/tasks
router.get('/:id/tasks', async (req: Request, res: Response) => {
  try {
    const flow = await prisma.flow.findUnique({
      where: { id: parseInt(req.params?.id) },
    });
    if (!flow) {
      res.status(400).send(`There is no flow with id ${req.params?.id}`);
      return;
    }
    const tasks = await prisma.task.findMany({
      where: {
        flowId: flow.id,
      },
    });
    res.status(200).json(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// GET /flows/{flow_id}/paths
router.get('/:id/paths', async (req: Request, res: Response) => {
  try {
    const flow = await prisma.path.findUnique({
      where: {
        id: parseInt(req.params?.id),
      },
    });
    if (!flow) {
      res.status(400).send(`There is no flow with id ${req.params?.id}`);
      return;
    }

    const paths = await prisma.path.findMany({
      where: {
        flowId: flow.id,
      },
    });
    res.status(200).json(paths);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// GET /flows/{flow_id}/actors
router.get('/:id/actors', async (req: Request, res: Response) => {
  try {
    const flow = await prisma.flow.findUnique({
      where: { id: parseInt(req.params?.id) },
    });
    if (!flow) {
      res.status(400).send(`There is no flow with id ${req.params?.id}`);
      return;
    }
    const actors = await prisma.actor.findMany({
      where: {
        flowId: flow.id,
      },
    });
    res.status(200).json(actors);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

export default router;
