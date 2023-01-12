import cors from "cors";
import dotenv from "dotenv";
import mySql_init from './utils/optional_init'
import express, { Request, Response, NextFunction } from "express";
import errorModel from "./models/errorModel";
import VacationRouter from "./controllers/vacation-controller";
import UserRouter from "./controllers/user-controller";
import AuthRouter from "./controllers/auth-controller";
import FollowRouter from "./controllers/follow-controller";
import catchAll from "./middleware/catchAll";
import fileUpload from "express-fileupload";

dotenv.config();
const server = express();

// ADMIN USER NAMES CAN BE SEEN IN ---> .env FILE

const corsOptions = {
  exposedHeaders: "authorization",
};
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.static("src/uploads"));
server.use(fileUpload({ createParentPath: true }));
server.use("/api/vacation", VacationRouter);
server.use("/api/user", UserRouter);
server.use("/api/auth", AuthRouter);
server.use("/api/follow", FollowRouter);
server.use("*", (Request: Request, response: Response, next: NextFunction) => {
  next(new errorModel(404, "route not found!"));
});
server.use(catchAll);
server.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
