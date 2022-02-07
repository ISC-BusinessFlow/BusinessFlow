import { Path, Task } from '@prisma/client';
import { Request, Response, Router } from 'express';

import relationController from '../relation/relationController';
import {
  CreateRelationType,
  PathOmit,
  TaskOmit,
} from '../relation/relationRepository';

const router = Router();
const controller = new relationController();

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const from: TaskOmit<Task> = {
      flowId: body.from.flow_id,
      name: body.from.name,
      typeId: body.from.type_id,
      actorId: body.from.actor_id,
      label: body.from.label || null,
      x: body.from.x,
      y: body.from.y,
    };
    const to: TaskOmit<Task> = {
      flowId: body.to.flow_id,
      name: body.to.name,
      typeId: body.to.type_id,
      actorId: body.to.actor_id,
      label: body.to.label || null,
      x: body.to.x,
      y: body.to.y,
    };
    const path: PathOmit<Path> = {
      flowId: body.path.flow_id,
      pathTypeId: body.path.type_id,
      label: body.path.label || null,
    };

    const relation: CreateRelationType = { from: from, to: to, path: path };
    const result = await controller.createRelation(relation);
    if (result instanceof Error) {
      res.status(400).send(result.message);
    }
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

export default router;
