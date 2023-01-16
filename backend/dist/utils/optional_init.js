"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../data-access/dal"));
var mysql_vacation = "CREATE TABLE IF NOT EXISTS vacations (id INT NOT NULL AUTO_INCREMENT, destination VARCHAR(45) NOT NULL, description VARCHAR(100) NOT NULL, image VARCHAR(250) NOT NULL,start DATE NOT NULL, finish DATE NOT NULL, price INT NOT NULL, followers INT NOT NULL, PRIMARY KEY (id))";
var mysql_user = "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(45) NOT NULL, last_name VARCHAR(45) NOT NULL,user_name VARCHAR(45) NOT NULL, password VARCHAR(45) NOT NULL, image VARCHAR(250) NOT NULL, role INT NOT NULL, PRIMARY KEY (id))";
var mysql_follow = "CREATE TABLE IF NOT EXISTS follows (id INT NOT NULL AUTO_INCREMENT, vacation_id INT NOT NULL, follower_id INT NOT NULL, PRIMARY KEY (id))";
var mySql_init = function () {
    (0, dal_1.default)(mysql_vacation);
    (0, dal_1.default)(mysql_user);
    (0, dal_1.default)(mysql_follow);
};
exports.default = mySql_init;
