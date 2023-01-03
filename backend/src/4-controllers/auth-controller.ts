import { Request, Response, NextFunction, Router } from "express";
import logic from "../3-logic/auth-logic";
import UserModel, { Role } from "../1-models/user-model";
import verifyRole from "../5-middleware/verify-role";
import refreshToken from "../5-middleware/refresh-token";

const AuthRouter = Router();

AuthRouter.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      delete request.body.confirmPass;
      const user: UserModel = request.body;
      const file: any = request.files?.image;
      const token = await logic.register(user, file);
      response.set("Authorization", token);
      response.status(201).json("signed in successfully!");
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = await logic.login(request.body);
      response.set("authorization", token);
      response.status(201).json("logged in successfully");
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.post(
  "/delete",
  verifyRole(Role.User),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const details = request.body;
      await logic.deleteUser(details);
      response.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.put(
  "/id/:id",
  verifyRole(Role.User),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const prevPass = request.body.prevPass;
      const user = request.body;
      const token = await logic.updateFullUser(user, prevPass);
      response.set("Authorization", token);
      response.status(201).json("profile edited successfully!");
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.put(
  "/changeprofile/:id",
  verifyRole(Role.User),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const prevName = request.body.prevImgName;
      delete request.body.prevImgName;
      const user = new UserModel(request.body);
      const file: any = request.files?.image;
      const token = await logic.updateUserProfile(user, file, prevName);
      response.set("Authorization", token);
      response.status(201).json("profile edited successfully!");
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.post(
  "/refresh-token",
  verifyRole(Role.User),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.body;
      const authHeader = request.header("authorization");
      const token = await logic.refreshToken(user, authHeader);
      response.set("Authorization", token);
      response.status(201).json("profile edited successfully!");
    } catch (err) {
      next(err);
    }
  }
);

export default AuthRouter;
