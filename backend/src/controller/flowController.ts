import { PrismaClient } from "@prisma/client";
import { Request, Response,Router } from "express";


const prisma = new PrismaClient();
const router = Router();

// GET /flows
router.get("/", async (req: Request, res: Response) => {
  const flows = await prisma.flow.findMany();
  res.json({ flows });
});



export default router
