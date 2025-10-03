import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret123"; 

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return null;
  }
};
