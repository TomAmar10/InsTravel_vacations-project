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
const jwt_helper_1 = __importDefault(require("../utils/jwt-helper"));
// import ErrorModel from "../models/error-Model";
// import { Role } from "../models/user-Model";
// const verifyRole = (role: Role) => {
const verifyRole = (role) => {
    return (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = request.header("authorization");
        const user = jwt_helper_1.default.getUserFromToken(authHeader);
        const isValid = yield jwt_helper_1.default.verifyToken(authHeader);
        if (!isValid) {
            // next(new ErrorModel(403, "inValid or expired token"));
            return;
        }
        if (user.role > role) {
            // next(new ErrorModel(403, "You are not permitted !"));
            return;
        }
        next();
    });
};
exports.default = verifyRole;
