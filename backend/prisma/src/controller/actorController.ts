import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const router = Router();

// POST /actors
router.post('/', async (req: Request, res: Response) => {
  try {
    const { flow_id: flowId, name } = req.body;

    const actor = await prisma.actor.create({
      data: {
        flowId,
        name,
      },
    });

    res.status(201).send(actor);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// GET /actors/{actor_id}
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const actor = await prisma.actor.findUnique({
      where: { id: parseInt(req.params?.id) },
    });

    if (!actor) {
      res.status(400).send(`There is no actor with id ${req.params.id}`);
      return;
    }

    res.status(200).send(actor);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// DELETE /actors/{actor_id}
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const actor = await prisma.actor.delete({
      where: { id: parseInt(req.params?.id) },
    });

    res.status(200).json(actor);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// PUT /actors/{actor_id}
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, flow_id: flowId } = req.body;
    const actor = await prisma.actor.findUnique({
      where: { id: parseInt(req.params?.id) },
    });

    if (!actor) {
      res.status(400).send(`There is no actor with id ${req.params?.id}`);
      return;
    }

    const updatedActor = await prisma.actor.update({
      where: { id: parseInt(req.params?.id) },
      data: {
        name,
        flowId,
      },
    });

    res.status(200).json(updatedActor);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

export default router;
