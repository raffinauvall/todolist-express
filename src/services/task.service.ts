import { create } from "domain";
import { createTask, getTasksByUser, updateTask, deleteTask } from "../repositories/task.repository";

export const createTaskService = async (title: string, userId: number) => {
    if (!title) throw new Error("Title is required");
    const task = await createTask(title, userId);
    return task;
}

export const getTaskService = async (userId: number) => {
    const tasks = await getTasksByUser(userId);
    return tasks;
}

export const updateTaskService = async(
        id: number,
        data: { title?: string; status?: boolean },
        userId: number
    ) => {
        const updated = await updateTask(id, data, userId);
        if (updated.count === 0) throw new Error("Task not found or unauthorized");
        return { message: "Task updated successfully"};
};

export const deleteTaskService = async (id: number, userId: number) => {
    const deleted = await deleteTask(id, userId);
    if (deleted.count === 0) throw new Error("Task not found or unauthorized");
    return { message: "Task deleted successfully"};
};