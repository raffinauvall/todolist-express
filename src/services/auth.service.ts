import { findUserByEmail, createUser } from "../repositories/auth.repository";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

export const registerService = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await hashPassword(password);
  const user = await createUser(email, hashedPassword);

  // jangan return password ke client
  return { id: user.id, email: user.email };
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ userId: user.id });

  return { user: { id: user.id, email: user.email }, token };
};
