import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string): Promise<User> | null => {
    return await prisma.user.findUnique({ where: { email } });
}

export const createUser = async (email: string, password: string): Promise<User> => {
    return await prisma.user.create({
        data: { email, password };
    });
}