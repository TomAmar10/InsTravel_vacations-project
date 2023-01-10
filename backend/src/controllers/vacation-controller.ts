import { Router, Request, Response, NextFunction } from "express";
import VacationModel from "../models/vacation-model";
import logic from "../logic/vacation-logic";
import safeDelete from "../utils/safe-delete";
import { v4 as uuid } from "uuid";
import verifyRole from "../middleware/verify-role";
import errorModel from "../models/error-model";
// import { Role } from "../models/user-Model";

const VacationRouter = Router();

VacationRouter.get(
  "/all/id/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacations = await logic.getAllVacationsByUserId(userId);
      response.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

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
  "/all/:userId/:sort/:order",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userID = +request.params.userId;
      const sortBy = request.params.sort;
      const order = request.params.order;
      const vacations = await logic.getSortedVacationsByUserID(
        userID,
        sortBy,
        order
      );
      response.status(200).json(vacations);
    } catch (err) {
      if (typeof err !== typeof errorModel) {
        next({
          status: 404,
          message: "something went wrong, please try again later",
        });
        return;
      }
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

      const vacations = await logic.getVacationsBetweenPrices(
        userID,
        max,
        sortBy,
        order
      );
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
      const vacation = await logic.getVacationByDestination(dest);
      response.status(200).json(vacation);
    } catch (err) {
      next(err);
    }
  }
);

// VacationRouter.post(
//   "/all",
//   verifyRole(Role.Admin),
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const vacation: VacationModel = request.body;
//       const file: any = request.files?.image;
//       if (file) {
//         const extension = file.name.substring(
//           file.name.lastIndexOf(".") // .jpg
//         );
//         const imageName = uuid() + extension;
//         const uploadPath = "./src/uploads/" + imageName;
//         vacation.image = imageName;
//         await file.mv(uploadPath);
//       }
//       vacation.followers = 0;
//       const addedVacation = await logic.addVacation(vacation);
//       response.status(201).json(addedVacation);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

VacationRouter.delete(
  "/:id",
  // verifyRole(Role.Admin),
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

// VacationRouter.put(
//   "/:id",
//   verifyRole(Role.Admin),
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const prevImgName = request.body.prevImgName;
//       const vacation: VacationModel = request.body;
//       const file: any = request.files?.image;
//       vacation.id = +request.params.id;
//       const newVacation = await logic.updateVacation(
//         vacation,
//         file,
//         prevImgName
//       );
//       response.status(200).json(newVacation);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

export default VacationRouter;