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
const auth_logic_1 = __importDefault(require("../logic/auth-logic"));
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/register", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        delete request.body.confirmPass;
        // const user: UserModel = request.body;
        const user = request.body;
        const file = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        const token = yield auth_logic_1.default.register(user, file);
        response.set("Authorization", token);
        response.status(201).json("signed in successfully!");
    }
    catch (err) {
        next(err);
    }
}));
AuthRouter.post("/login", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield auth_logic_1.default.login(request.body);
        response.set("authorization", token);
        response.status(201).json("logged in successfully");
    }
    catch (err) {
        next(err);
    }
}));
AuthRouter.post("/delete", 
// verifyRole(Role.User),
(request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = request.body;
        yield auth_logic_1.default.deleteUser(details);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}));
AuthRouter.put("/update/:id", 
// verifyRole(Role.User),
(request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prevPass = request.body.prevPass;
        const user = request.body;
        const token = yield auth_logic_1.default.updateFullUser(user, prevPass);
        response.set("Authorization", token);
        response.status(201).json("profile edited successfully!");
    }
    catch (err) {
        next(err);
    }
}));
AuthRouter.put("/changeprofile/:id", 
// verifyRole(Role.User),
(request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const prevName = request.body.prevImgName;
        delete request.body.prevImgName;
        // const user = new UserModel(request.body);
        const user = request.body;
        const file = (_b = request.files) === null || _b === void 0 ? void 0 : _b.image;
        const token = yield auth_logic_1.default.updateUserProfile(user, file, prevName);
        response.set("Authorization", token);
        response.status(201).json("profile edited successfully!");
    }
    catch (err) {
        next(err);
    }
}));
exports.default = AuthRouter;
