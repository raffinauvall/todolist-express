import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/bcrypt"
import { generateToken } from "../utils/jwt.js"

const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashed = hashPassword(password);

    try {
        const user = await prisma.user.create({
            data: {email, password: hashed}
        });
        res.json({message: "User Created", userId: user.id})
    } catch (err) {
        res.status(400).json({ message: "User already exists" });
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: {email} });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isValid = comparePassword(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid Passowrd" });

    const token = generateToken(user.id);
    res.json(token);
}