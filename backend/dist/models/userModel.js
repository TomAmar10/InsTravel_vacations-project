"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["User"] = 2] = "User";
})(Role = exports.Role || (exports.Role = {}));
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.user_name = user.user_name;
        this.password = user.password;
        this.image = user.image;
        this.role = user.role;
        this.token = user.token;
    }
    return UserModel;
}());
exports.default = UserModel;
