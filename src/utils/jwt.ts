import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" })
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET) as {userId: number};
    } catch (err) {
        return null;
    }
}