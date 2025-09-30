import { Router } from "express";
import { getTasks, createTasks, updateTasks, deleteTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.get("/", getTasks);
router.post("/", createTasks)
router.put("/:id", updateTasks);
router.delete("/:id", deleteTask);

export default router;