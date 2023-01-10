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
// import UserModel from "../models/user-Model";
const user_logic_1 = __importDefault(require("../logic/user-logic"));
const UserRouter = (0, express_1.Router)();
UserRouter.get("/all", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users: UserModel[] = await logic.getAllUsers();
        const users = yield user_logic_1.default.getAllUsers();
        response.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
}));
UserRouter.get("/all/usernames", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users: UserModel[] = await logic.getAllUsernames();
        const users = yield user_logic_1.default.getAllUsernames();
        response.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
}));
UserRouter.get("/id/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +request.params.id;
        // const user: UserModel = await logic.getUserById(id);
        const user = yield user_logic_1.default.getUserById(id);
        response.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}));
UserRouter.get("/username/:username", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = request.params.username;
        const user = yield user_logic_1.default.getUserByUsername(username);
        response.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = UserRouter;
