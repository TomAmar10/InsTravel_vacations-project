"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CredentialsModel {
    constructor(user) {
        this.user_name = user.user_name;
        this.password = user.password;
    }
}
exports.default = CredentialsModel;
