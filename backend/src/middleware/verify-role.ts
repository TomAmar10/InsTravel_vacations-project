import jwtHelper from "../utils/jwt-helper";
import { NextFunction, Request, Response } from "express";
import ErrorModel from "../models/errorModel";
import { Role } from "../models/userModel";

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
    next();
  };
};

export default verifyRole;
