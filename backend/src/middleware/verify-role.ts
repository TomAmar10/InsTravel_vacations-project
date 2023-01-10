import jwtHelper from "../utils/jwt-helper";
import { NextFunction, Request, Response } from "express";
// import ErrorModel from "../models/error-Model";
// import { Role } from "../models/user-Model";

// const verifyRole = (role: Role) => {
const verifyRole = (role: any) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.header("authorization");
    const user = jwtHelper.getUserFromToken(authHeader);

    const isValid = await jwtHelper.verifyToken(authHeader);
    if (!isValid) {
      // next(new ErrorModel(403, "inValid or expired token"));
      return;
    }
    if (user.role > role) {
      // next(new ErrorModel(403, "You are not permitted !"));
      return;
    }
    next();
  };
};

export default verifyRole;
