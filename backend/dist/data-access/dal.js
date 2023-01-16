"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = __importDefault(require("mysql2"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var connection = mysql2_1.default.createPool({
    host: process.env.NODE_ENV === 'production' ? process.env.MY_SQL_HOST : 'localhost',
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DB,
    port: +process.env.MY_SQL_PORT,
});
var execute = function (sql) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};
exports.default = execute;
