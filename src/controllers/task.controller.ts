import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

export const getTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" }
  });
  res.json(tasks);
};

export const createTasks = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  const task = await prisma.task.create({
    data: { title, userId: req.userId!, status: false }
  });
  res.json({ task, message: "Task successfully created." });
};

export const updateTasks = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, status } = req.body;

  const task = await prisma.task.updateMany({
    where: { id: Number(id), userId: req.userId },
    data: { title, status }
  });

  res.json({ task, message: "Task successfully updated." });
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  await prisma.task.deleteMany({
    where: { id: Number(id), userId: req.userId }
  });

  res.json({ message: "Task successfully deleted." });
};
