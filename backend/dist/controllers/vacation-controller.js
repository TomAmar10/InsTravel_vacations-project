"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacation_logic_1 = __importDefault(require("../logic/vacation-logic"));
const safe_delete_1 = __importDefault(require("../utils/safe-delete"));
const uuid_1 = require("uuid");
const verify_role_1 = __importDefault(require("../middleware/verify-role"));
const error_model_1 = __importDefault(require("../models/error-model"));
// import { Role } from "../models/user-Model";
const VacationRouter = (0, express_1.Router)();
VacationRouter.get("/all/followed", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacations = yield vacation_logic_1.default.getFollowedVacations();
        response.status(200).json(vacations);
    }
    catch (err) {
        next(err);
    }
}));
VacationRouter.get("/all/sorted/:userId/:sort/:order", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = +request.params.userId;
        const sortBy = request.params.sort;
        const order = request.params.order;
        const vacations = yield vacation_logic_1.default.getSortedByUserID(userID, sortBy, order);
        response.status(200).json(vacations);
    }
    catch (err) {
        if (typeof err !== typeof error_model_1.default) {
            next({
                status: 404,
                message: "something went wrong, please try again later",
            });
            return;
        }
        next(err);
    }
}));
VacationRouter.get("/all/price/:userId/:max/:sort/:order", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = +request.params.userId;
        const max = +request.params.max;
        const sortBy = request.params.sort;
        const order = request.params.order;
        const vacations = yield vacation_logic_1.default.getPriceRange(userID, max, sortBy, order);
        response.status(200).json(vacations);
    }
    catch (err) {
        next(err);
    }
}));
VacationRouter.get("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +request.params.id;
        const type = yield vacation_logic_1.default.getVacation(id);
        response.status(200).json(type);
    }
    catch (err) {
        next(err);
    }
}));
VacationRouter.get("/destination/:destination", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dest = request.params.destination;
        const vacation = yield vacation_logic_1.default.getVacationByName(dest);
        response.status(200).json(vacation);
    }
    catch (err) {
        next(err);
    }
}));
VacationRouter.post("/add", (0, verify_role_1.default)(1), 
// verifyRole(Role.Admin),
(request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const vacation = request.body;
        const file = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        if (file) {
            const extension = file.name.substring(file.name.lastIndexOf(".") // .jpg
            );
            const imageName = (0, uuid_1.v4)() + extension;
            const uploadPath = "./src/uploads/" + imageName;
            vacation.image = imageName;
            yield file.mv(uploadPath);
        }
        vacation.followers = 0;
        const addedVacation = yield vacation_logic_1.default.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err) {
        next(err);
    }
}));
VacationRouter.delete("/delete/:id", (0, verify_role_1.default)(1), 
// verifyRole(Role.Admin),
(request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +request.params.id;
        const vacation = yield vacation_logic_1.default.getVacation(id);
        (0, safe_delete_1.default)(`./src/uploads/${vacation[0].image}`);
        yield vacation_logic_1.default.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}));
VacationRouter.put("/update/:id", (0, verify_role_1.default)(1), 
// verifyRole(Role.Admin),
(request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prevImgName = request.body.prevImgName;
        const vacation = request.body;
        const file = (_b = request.files) === null || _b === void 0 ? void 0 : _b.image;
        vacation.id = +request.params.id;
        const newVacation = yield vacation_logic_1.default.updateVacation(vacation, file, prevImgName);
        response.status(200).json(newVacation);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = VacationRouter;
