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
// import { Role } from "../models/user-Model";
const follow_logic_1 = __importDefault(require("../logic/follow-logic"));
const FollowRouter = (0, express_1.Router)();
FollowRouter.get("/all", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const follows = yield follow_logic_1.default.getAllFollows();
        response.status(200).json(follows);
    }
    catch (err) {
        next(err);
    }
}));
FollowRouter.post("/all", 
// verifyRole(Role.User),
(request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedFollow = yield follow_logic_1.default.addFollow(request.body);
        response.status(201).json(addedFollow);
    }
    catch (err) {
        next(err);
    }
}));
FollowRouter.delete("/id/:vacationId/:userId", 
// verifyRole(Role.User),
(request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        yield follow_logic_1.default.deleteFollow(userId, vacationId);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = FollowRouter;
