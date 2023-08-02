"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var errorModel_1 = __importDefault(require("./models/errorModel"));
var vacation_controller_1 = __importDefault(require("./controllers/vacation-controller"));
var user_controller_1 = __importDefault(require("./controllers/user-controller"));
var auth_controller_1 = __importDefault(require("./controllers/auth-controller"));
var follow_controller_1 = __importDefault(require("./controllers/follow-controller"));
var catchAll_1 = __importDefault(require("./middleware/catchAll"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var config_1 = require("./utils/config");
dotenv_1.default.config();
var server = (0, express_1.default)();
// execute only for init
// mySql_init();
// ADMIN USER NAMES CAN BE SEEN IN ---> .env FILE
var corsOptions = {
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
server.use("*", function (Request, response, next) {
    next(new errorModel_1.default(404, "route not found!"));
});
server.use(catchAll_1.default);
server.listen(config_1.config.server.port, function () {
    return console.log("listening on port " + config_1.config.server.port);
});
