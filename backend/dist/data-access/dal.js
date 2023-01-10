"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../utils/config"));
const connection = mysql_1.default.createPool({
    host: config_1.default.mySQLhost,
    user: config_1.default.mySQLUser,
    password: config_1.default.mySQLPassword,
    database: config_1.default.mySqlDB,
    port: config_1.default.mySqlPort,
});
const execute = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};
exports.default = execute;
