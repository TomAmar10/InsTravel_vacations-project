"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import UserModel from "../models/user-Model";
// const getToken = (user: UserModel) => {
const getToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ user }, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: process.env.NODE_ENV === "production" ? "1h" : "5h",
    });
    return token;
};
const verifyToken = (authHeader) => {
    return new Promise((resolve) => {
        if (!authHeader) {
            resolve(false);
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            resolve(false);
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, payload) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};
// const getUserFromToken = (authHeader: string): UserModel => {
const getUserFromToken = (authHeader) => {
    const token = authHeader.split(" ")[1];
    const payload = jsonwebtoken_1.default.decode(token);
    const user = payload;
    return user;
};
exports.default = { getToken, verifyToken, getUserFromToken };
