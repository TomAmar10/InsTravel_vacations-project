import { Router, Request, Response, NextFunction } from "express";
import VacationModel from "../models/vacationModel";
import logic from "../logic/vacation-logic";
import safeDelete from "../utils/safe-delete";
import { v4 as uuid } from "uuid";
import verifyRole from "../middleware/verify-role";
import { Role } from "../models/userModel";

const VacationRouter = Router();

VacationRouter.get(
  "/all/followed",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await logic.getFollowedVacations();
      response.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

VacationRouter.get(
  "/all/sorted/:userId/:sort/:order",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userID = +request.params.userId;
      const sortBy = request.params.sort;
      const order = request.params.order;
      const vacations = await logic.getSortedByUserID(userID, sortBy, order);
      response.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

VacationRouter.get(
  "/all/price/:userId/:max/:sort/:order",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userID = +request.params.userId;
      const max = +request.params.max;
      const sortBy = request.params.sort;
      const order = request.params.order;
      const vacations = await logic.getPriceRange(userID, max, sortBy, order);
      response.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

VacationRouter.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const type = await logic.getVacation(id);
      response.status(200).json(type);
    } catch (err) {
      next(err);
    }
  }
);

VacationRouter.get(
  "/destination/:destination",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const dest = request.params.destination;
      const vacation = await logic.getVacationByName(dest);
      response.status(200).json(vacation);
    } catch (err) {
      next(err);
    }
  }
);

VacationRouter.post(
  "/add",
  verifyRole(Role.Admin),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacation: VacationModel = request.body;
      const file: any = request.files?.image;
      if (file) {
        const extension = file.name.substring(
          file.name.lastIndexOf(".") // .jpg
        );
        const imageName = uuid() + extension;
        const uploadPath = "./src/uploads/" + imageName;
        vacation.image = imageName;
        await file.mv(uploadPath);
      }
      vacation.followers = 0;
      const addedVacation = await logic.addVacation(vacation);
      response.status(201).json(addedVacation);
    } catch (err) {
      next(err);
    }
  }
);

VacationRouter.delete(
  "/delete/:id",
  verifyRole(Role.Admin),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const vacation = await logic.getVacation(id);
      safeDelete(`./src/uploads/${vacation[0].image}`);
      await logic.deleteVacation(id);
      response.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

VacationRouter.put(
  "/update/:id",
  verifyRole(Role.Admin),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const prevImgName = request.body.prevImgName;
      const vacation: VacationModel = request.body;
      const file: any = request.files?.image;
      vacation.id = +request.params.id;
      const newVacation = await logic.updateVacation(
        vacation,
        file,
        prevImgName
      );
      response.status(200).json(newVacation);
    } catch (err) {
      next(err);
    }
  }
);

export default VacationRouter;
