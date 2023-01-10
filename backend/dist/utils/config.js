"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.mySQLhost = "localhost";
        this.mySQLUser = "root";
        this.mySQLPassword = "12345678";
        this.mySqlDB = "vacation";
        this.mySqlPort = 3306;
        this.AdminUNames = ["tomass", "adammm"];
    }
    checkAdmin(uname) {
        return this.AdminUNames.includes(uname);
    }
}
const config = new Config();
exports.default = config;
