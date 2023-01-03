import jwtHelper from "../6-Utils/jwt-helper";
import { NextFunction, Request, Response } from "express";
import ErrorModel from "../1-models/error-Model";
import { Role } from "../1-models/user-Model";

const verifyRole = (role: Role) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.header("authorization");
    const user = jwtHelper.getUserFromToken(authHeader);
    const isValid = await jwtHelper.verifyToken(authHeader);
    if (!isValid) {
      next(new ErrorModel(403, "inValid or expired token"));
      return;
    }
    if (user.role > role) {
      next(new ErrorModel(403, "You are not permitted !"));
      return;
    }
    next(authHeader);
  };
};

export default verifyRole;
