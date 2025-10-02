import { TaskRepository } from "../repositories/task.repository.js";

export class TaskService {
    static async getTasks(userId: number) {
        return TaskRepository.findAllByUser(userId);
    }

    static async createTask(userId: number, title: string) {
        return TaskRepository.create(userId, title);
    }

    static async updateTask(taskId: number, userId: number, data: any) {
        return TaskRepository.update(taskId, userId, data);
    }

    static async deleteTask(taskId: number, userId: number) {
        return TaskRepository.delete(taskId, userId);
    }
}

