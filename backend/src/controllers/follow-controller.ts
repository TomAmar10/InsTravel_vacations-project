import { Router, Request, Response, NextFunction } from "express";
import { Role } from "../models/userModel";
import logic from "../logic/follow-logic";
import verifyRole from "../middleware/verify-role";

const FollowRouter = Router();

FollowRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const follows = await logic.getAllFollows();
      response.status(200).json(follows);
    } catch (err) {
      next(err);
    }
  }
);

FollowRouter.post(
  "/all",
  verifyRole(Role.User),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const addedFollow = await logic.addFollow(request.body);
      response.status(201).json(addedFollow);
    } catch (err) {
      next(err);
    }
  }
);

FollowRouter.delete(
  "/id/:vacationId/:userId",
  verifyRole(Role.User),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      await logic.deleteFollow(userId, vacationId);
      response.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);


export default FollowRouter;
