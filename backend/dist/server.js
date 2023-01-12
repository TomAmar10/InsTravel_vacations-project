"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const error_model_1 = __importDefault(require("./models/error-model"));
const vacation_controller_1 = __importDefault(require("./controllers/vacation-controller"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth-controller"));
const follow_controller_1 = __importDefault(require("./controllers/follow-controller"));
const catchAll_1 = __importDefault(require("./middleware/catchAll"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv_1.default.config();
const server = (0, express_1.default)();
// ADMIN USER NAMES CAN BE SEEN IN ---> .env FILE
const corsOptions = {
    exposedHeaders: "authorization",
};
server.use((0, cors_1.default)(corsOptions));
server.use(express_1.default.json());
server.use(express_1.default.static("src/uploads"));
server.use((0, express_fileupload_1.default)({ createParentPath: true }));
server.use("/api/vacation", vacation_controller_1.default);
server.use("/api/user", user_controller_1.default);
server.use("/api/auth", auth_controller_1.default);
server.use("/api/follow", follow_controller_1.default);
server.use("*", (Request, response, next) => {
    next(new error_model_1.default(404, "route not found!"));
});
server.use(catchAll_1.default);
console.log(process.env.MY_SQL_HOST);
console.log(process.env.MY_SQL_USER);
console.log(process.env.MY_SQL_PASSWORD);
console.log(process.env.MY_SQL_DB);
console.log(process.env.MY_SQL_PORT);
server.listen(process.env.PORT, () => console.log("listening on port " + process.env.PORT));
