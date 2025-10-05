import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createTaskService, getTaskService, updateTaskService, deleteTaskService } from "../services/task.service";

export const getTasks = async (req: AuthRequest, res: Response) => {
  try{
    const userId = req.userId!;
    const tasks = await getTaskService(userId);
    res.json(tasks);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try{
    const { title } = req.body;
    const userId = req.userId!;
    const tasks = await createTaskService(title, userId);
    res.status(200).json({ message: "Task created successfully." })
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
}

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const userId = req.userId!;
    const response = await updateTaskService(Number(id), { title, status }, userId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;
    const response = await deleteTaskService(Number(id), userId);
    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}