"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var getToken = function (user) {
    var token = jsonwebtoken_1.default.sign({ user: user }, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: process.env.NODE_ENV === "production" ? "1h" : "5h",
    });
    return token;
};
var verifyToken = function (authHeader) {
    return new Promise(function (resolve) {
        if (!authHeader) {
            resolve(false);
            return;
        }
        var token = authHeader.split(" ")[1];
        if (!token) {
            resolve(false);
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET_TOKEN, function (err, payload) {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};
var getUserFromToken = function (authHeader) {
    var token = authHeader.split(" ")[1];
    var payload = jsonwebtoken_1.default.decode(token);
    var user = payload;
    return user;
};
exports.default = { getToken: getToken, verifyToken: verifyToken, getUserFromToken: getUserFromToken };
