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
const user_model_1 = require("../models/user-model");
const dal_1 = __importDefault(require("../data-access/dal"));
const jwt_helper_1 = __importDefault(require("../utils/jwt-helper"));
const uuid_1 = require("uuid");
const error_model_1 = __importDefault(require("../models/error-model"));
const safe_delete_1 = __importDefault(require("../utils/safe-delete"));
const config_1 = __importDefault(require("../utils/config"));
const register = (user, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const extension = file.name.substring(file.name.lastIndexOf(".") // .jpg
        );
        const imageName = (0, uuid_1.v4)() + extension;
        const uploadPath = "./src/uploads/" + imageName;
        user.image = imageName;
        yield file.mv(uploadPath);
    }
    if (!file)
        user.image = "profile.png";
    user.role = config_1.default.checkAdmin(user.user_name) ? user_model_1.Role.Admin : user_model_1.Role.User;
    const sql = `
      INSERT INTO users
      Values (DEFAULT , '${user.first_name}', '${user.last_name}', '${user.user_name}', '${user.password}', '${user.image}', ${user.role})
    `;
    const result = yield (0, dal_1.default)(sql);
    if (!result.insertId)
        throw new error_model_1.default(400, "invalid details, please try again");
    user.id = result.insertId;
    user.password = "";
    const token = jwt_helper_1.default.getToken(user);
    return token;
});
const login = (userCred) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM users WHERE user_name = '${userCred.user_name}' AND password = '${userCred.password}'`;
    const user = yield (0, dal_1.default)(sql);
    if (!user[0])
        throw new error_model_1.default(401, "invalid details, please try again");
    user[0].password = "";
    const token = jwt_helper_1.default.getToken(user[0]);
    return token;
});
const deleteUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM users WHERE user_name = '${user.user_name}' AND password = '${user.password}'`;
    const result = yield (0, dal_1.default)(sql);
    if (!result.affectedRows)
        throw new error_model_1.default(401, "wrong details!");
    if (user.image !== "profile.png")
        (0, safe_delete_1.default)(`./src/uploads/${user.image}`);
    const sql2 = `DELETE FROM follows WHERE follower_id = ${user.id}`;
    yield (0, dal_1.default)(sql2);
    return result.affectedRows;
});
const updateFullUser = (user, prevPass) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `UPDATE users SET first_name = '${user.first_name}', last_name = '${user.last_name}', 
  user_name = '${user.user_name}', password = '${user.password}', image = '${user.image}', 
  role = ${user.role} WHERE password = '${prevPass}' AND user_name = '${user.user_name}'`;
    const result = yield (0, dal_1.default)(sql);
    if (!result.affectedRows)
        throw new error_model_1.default(401, "wrong details!");
    const userToToken = Object.assign({}, user);
    delete userToToken.password;
    delete userToToken.token;
    const token = jwt_helper_1.default.getToken(userToToken);
    return token;
});
const updateUserProfile = (user, file, prevName) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = +user.role;
    if (prevName !== "profile.png")
        (0, safe_delete_1.default)("./src/uploads/" + prevName);
    if (file) {
        const extension = file.name.substring(file.name.lastIndexOf(".") // .jpg
        );
        const imageName = (0, uuid_1.v4)() + extension;
        const uploadPath = "./src/uploads/" + imageName;
        user.image = imageName;
        yield file.mv(uploadPath);
    }
    if (!file)
        user.image = "profile.png";
    const sql = `UPDATE users SET image = '${user.image}' WHERE id = ${user.id}`;
    const result = yield (0, dal_1.default)(sql);
    if (!result.affectedRows)
        throw new error_model_1.default(404, "something went wrong");
    const token = jwt_helper_1.default.getToken(user);
    return token;
});
// const refreshToken = async (user: UserModel, token: string) => {
//   if (!allRefreshTokens.includes(token))
//     throw new errorModel(403, "refresh token is not valid!");
//   allRefreshTokens = allRefreshTokens.filter((t) => t !== token);
//   const newToken = jwtHelper.getRefreshToken(user);
//   return newToken;
// };
exports.default = {
    login,
    register,
    deleteUser,
    updateFullUser,
    updateUserProfile,
};
