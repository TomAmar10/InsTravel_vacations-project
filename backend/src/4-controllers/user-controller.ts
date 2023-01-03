import { Router, Request, Response, NextFunction } from "express";
import errorModel from "../1-models/error-model";
import UserModel from "../1-models/user-Model";
import logic from "../3-logic/user-logic";

const UserRouter = Router();

UserRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users: UserModel[] = await logic.getAllUsers();
      response.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);
UserRouter.get(
  "/all/usernames",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users: UserModel[] = await logic.getAllUsernames();
      response.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.get(
  "/id/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const user: UserModel = await logic.getUserById(id);
      response.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);
UserRouter.get(
  "/username/:username",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const username = request.params.username;
      const user = await logic.getUserByUsername(username);
      response.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

export default UserRouter;
