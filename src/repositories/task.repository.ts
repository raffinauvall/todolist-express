import { PrismaClient } from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

export class TaskRepository {
    static async create(userId: number, title: string) {
        return prisma.task.create({
            data: { title, userId, status: false },
        });
    }

    static async findAllByUser(userId: number) {
        return prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: "title"},
        });
    }

    static async findById(taskId: number, userId: number) {
        return prisma.task.findFirst({
            where: { id: taskId, userId },
        });
    }

    static async update(taskId: number, userId: number, data: any) {
        return prisma.task.updateMany({
            where: { id: taskId, userId },
            data,
        });
    }

    static delete(taskId: number, userId: number) {
        return prisma.task.deleteMany({
            where: { id: taskId, userId}
        });
    }
}