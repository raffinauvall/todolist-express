import { prisma } from "../utils/prisma"

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (email: string, password: string) => {
    return prisma.user.create({
        data: { email, password },
    });
};