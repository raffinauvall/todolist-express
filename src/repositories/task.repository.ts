import { prisma } from "../utils/prisma"

export const createTask = async (title: string, userId: number) => {
    return await prisma.task.create({
        data: {
            title,
            userId
        },
    });
};

export const getTasksByUser = async (userId: number) => {
    return await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};

export const updateTask = async (id: number, data: { title?: string, status?: boolean}, userId: number) => {
    return await prisma.task.updateMany({
        where: { id, userId },
        data,
    });
};

export const deleteTask = async (id: number, userId: number) => {
    return await prisma.task.deleteMany({
        where: { id, userId },
    });
};