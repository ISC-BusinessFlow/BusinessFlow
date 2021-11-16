import { Path, PrismaClient } from "@prisma/client";
import { Request, Response,Router } from "express";

const prisma = new PrismaClient();
const router = Router();

// GET /flows
router.get("/", async (req: Request, res: Response) => {
  const flows = await prisma.flow.findMany();
  res.status(200).json(flows);
});

// POST /flows
router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const flow = await prisma.flow.create({
    data: {
      name: name
    }
  });
  if (flow) {
    res.status(201).json(flow);
  } else {
    res.status(500).send();
  }
})

// DELETE /flows/{flow_id}
router.delete("/:id", async (req: Request, res: Response) => {
  const flow = await prisma.flow.delete({
    where: { id: parseInt(req.params?.id) },
  });
  if (flow) {
    res.status(200).json(flow);
  } else {
    res.status(500).send();
  }
})

// PUT /flows/{flow_id}
router.put("/:id", async (req: Request, res: Response) => {
  const { name } = req.body;
  const flow = await prisma.flow.findUnique({
    where: { id: parseInt(req.params?.id) },
  });

  if (!flow) {
    throw new Error("flow is empty")
  }

  const updated_flow = await prisma.flow.update({
    where: {
      id: parseInt(req.params?.id)
    },
    data: {
      name: name
    }
  })

  if (updated_flow) {
    res.status(200).json({ updated_flow })
  } else {
    res.status(500).send();
  }

});

// GET /flows/{flow_id}/tasks
router.get("/:id/tasks", async (req: Request, res: Response) => {
  const flow = await prisma.flow.findUnique({
    where: { id: parseInt(req.params?.id) },
  });
  if (!flow) {
    throw new Error("flow is empty")
  }
  const tasks = await prisma.task.findMany({
    where: {
      flowId: flow.id,
    }
  });
  res.status(200).json(tasks);
});

// GET /flows/{flow_id}/paths
router.get("/:id/paths", async (req: Request, res: Response) => {
  const flow = await prisma.flow.findUnique({
    where: { id: parseInt(req.params?.id) },
  });
  if (!flow) {
    throw new Error("flow is empty")
  }

  const paths = await prisma.path.findMany();
  const tasks = await prisma.task.findMany({
    where: {
      flowId: flow.id,
    }
  });

  (async () => {
    const related_paths: Path[] = [];
    for (const task of tasks) {
      for (const path of paths) {
        if (task.id === path.fromTaskId) {
          related_paths.push(path)
        }
      }
    }
    res.status(200).json( related_paths );
  })()
});

// GET /flows/{flow_id}/actors
router.get("/:id/actors", async (req: Request, res: Response) => {
  const flow = await prisma.flow.findUnique({
    where: { id: parseInt(req.params?.id) },
  });
  if (!flow) {
    throw new Error("flow is empty")
  }
  const actors = await prisma.actor.findMany({
    where: {
      flowId: flow.id,
    }
  });
  res.status(200).json(actors);
});


export default router
