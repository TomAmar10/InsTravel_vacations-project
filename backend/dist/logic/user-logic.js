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
const dal_1 = __importDefault(require("../data-access/dal"));
const error_model_1 = __importDefault(require("../models/error-model"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM users`;
    const users = yield (0, dal_1.default)(sql);
    if (!users.length)
        throw new error_model_1.default(204, "no users found");
    return users;
});
const getAllUsernames = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT user_name FROM users`;
    const users = yield (0, dal_1.default)(sql);
    if (!users.length)
        throw new error_model_1.default(204, "no users found");
    return users;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    const user = yield (0, dal_1.default)(sql);
    if (!user[0])
        throw new error_model_1.default(204, "no user found");
    return user[0];
});
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM users WHERE username = ${username}`;
    const user = yield (0, dal_1.default)(sql);
    if (!user[0])
        throw new error_model_1.default(204, "no user found");
    return user;
});
exports.default = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getAllUsernames,
};
