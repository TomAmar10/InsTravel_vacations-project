import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

const getToken = (user: UserModel) => {
  const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: process.env.NODE_ENV === "production" ? "1h" : "5h",
  });
  return token;
};

const verifyToken = (authHeader: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    if (!authHeader) {
      resolve(false);
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      resolve(false);
      return;
    }

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err: any, payload) => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
};

const getUserFromToken = (authHeader: string): UserModel => {
  const token = authHeader.split(" ")[1];
  const payload = jwt.decode(token);
  const user = payload as any;
  return user;
};

export default { getToken, verifyToken, getUserFromToken };
