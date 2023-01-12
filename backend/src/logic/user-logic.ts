import execute from "../data-access/dal";
import errorModel from "../models/errorModel";
import UserModel from "../models/userModel";

const getAllUsers = async (): Promise<UserModel[]> => {
  const sql = `SELECT * FROM users`;
  const users = await execute(sql);
  if (!users.length) throw new errorModel(204, "no users found");
  return users;
};
const getAllUsernames = async (): Promise<UserModel[]> => {
  const sql = `SELECT user_name FROM users`;
  const users = await execute(sql);
  if (!users.length) throw new errorModel(204, "no users found");
  return users;
};

const getUserById = async (id: number): Promise<UserModel> => {
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  const user = await execute(sql);
  if (!user[0]) throw new errorModel(204, "no user found");
  return user[0];
};
const getUserByUsername = async (username: string): Promise<UserModel[]> => {
  const sql = `SELECT * FROM users WHERE username = ${username}`;
  const user = await execute(sql);
  if (!user[0]) throw new errorModel(204, "no user found");
  return user;
};

export default {
  getAllUsers,

  getUserById,
  getUserByUsername,
  getAllUsernames,
};
