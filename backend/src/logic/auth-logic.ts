import { UploadedFile } from "express-fileupload";
import { OkPacket } from "mysql";
import CredentialsModel from "../models/credentialsModel";
import UserModel, { Role } from "../models/userModel";
import execute from "../data-access/dal";
import jwtHelper from "../utils/jwt-helper";
import { v4 as uuid } from "uuid";
import errorModel from "../models/errorModel";
import safeDelete from "../utils/safe-delete";
import dotenv from "dotenv";
dotenv.config();

const register = async (
  user: UserModel,
  file: UploadedFile
): Promise<string> => {
  if (file) {
    const extension = file.name.substring(
      file.name.lastIndexOf(".") // .jpg
    );
    const imageName = uuid() + extension;
    const uploadPath = "./src/uploads/" + imageName;
    user.image = imageName;
    await file.mv(uploadPath);
  }
  if (!file) user.image = "profile.png";
  const isAdmin = process.env.ADMIN_USERNAMES.includes(user.user_name);
  user.role = isAdmin ? Role.Admin : Role.User;
  const sql = `
      INSERT INTO users
      Values (DEFAULT , '${user.first_name}', '${user.last_name}', '${user.user_name}', '${user.password}', '${user.image}', ${user.role})
    `;
  const result: OkPacket = await execute(sql);
  if (!result.insertId)
    throw new errorModel(400, "invalid details, please try again");

  user.id = result.insertId;
  delete user.password;
  const token = jwtHelper.getToken(user);
  return token;
};

const login = async (userCred: CredentialsModel): Promise<string> => {
  const sql = `SELECT * FROM users WHERE user_name = '${userCred.user_name}' AND password = '${userCred.password}'`;
  const user = await execute(sql);
  if (!user[0]) throw new errorModel(401, "invalid details, please try again");

  delete user[0].password;
  delete user[0].token;
  const token = jwtHelper.getToken(user[0]);
  return token;
};

const deleteUser = async (user: UserModel) => {
  const sql = `DELETE FROM users WHERE user_name = '${user.user_name}' AND password = '${user.password}'`;
  const result = await execute(sql);

  if (!result.affectedRows) throw new errorModel(401, "wrong details!");
  if (user.image !== "profile.png") safeDelete(`./src/uploads/${user.image}`);

  const sql2 = `DELETE FROM follows WHERE follower_id = ${user.id}`;
  await execute(sql2);
  return result.affectedRows;
};

const updateFullUser = async (user: UserModel, prevPass: string) => {
  const sql = `UPDATE users SET first_name = '${user.first_name}', last_name = '${user.last_name}', 
  user_name = '${user.user_name}', password = '${user.password}', image = '${user.image}', 
  role = ${user.role} WHERE password = '${prevPass}' AND user_name = '${user.user_name}'`;

  const result = await execute(sql);
  if (!result.affectedRows) throw new errorModel(401, "wrong details!");
  const userToToken = { ...user };
  delete userToToken.password;
  delete userToToken.token;
  const token = jwtHelper.getToken(userToToken);
  return token;
};

const updateUserProfile = async (
  user: UserModel,
  file: UploadedFile,
  prevName: string
) => {
  user.role = +user.role;
  if (prevName !== "profile.png") safeDelete("./src/uploads/" + prevName);
  if (file) {
    const extension = file.name.substring(
      file.name.lastIndexOf(".") // .jpg
    );
    const imageName = uuid() + extension;
    const uploadPath = "./src/uploads/" + imageName;
    user.image = imageName;
    await file.mv(uploadPath);
  }
  if (!file) user.image = "profile.png";
  const sql = `UPDATE users SET image = '${user.image}' WHERE id = ${user.id}`;
  const result = await execute(sql);
  if (!result.affectedRows) throw new errorModel(404, "something went wrong");
  const userToToken = { ...user };
  delete userToToken.token;
  delete userToToken.password;
  const token = jwtHelper.getToken(user);
  return token;
};

const deleteAllData = async () => {
  const sql1 = `DELETE FROM users`;
  const result1 = await execute(sql1);
  const sql2 = `DELETE FROM vacations`;
  const result2 = await execute(sql2);
  const sql3 = `DELETE FROM follows`;
  const result3 = await execute(sql3);
};

export default {
  login,
  register,
  deleteUser,
  updateFullUser,
  updateUserProfile,
  deleteAllData,
};
