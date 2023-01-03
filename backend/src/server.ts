import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import errorModel from "./1-models/error-model";
import VacationRouter from "./4-controllers/vacation-controller";
import UserRouter from "./4-controllers/user-controller";
import AuthRouter from "./4-controllers/auth-controller";
import FollowRouter from "./4-controllers/follow-controller";
import catchAll from "./5-middleware/catchAll";
import dotenv from "dotenv";
import mySql_init from "./6-utils/init";
import fileUpload from "express-fileupload";

dotenv.config();
const server = express();

mySql_init();
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
