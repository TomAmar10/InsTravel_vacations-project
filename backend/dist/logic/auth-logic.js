"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = require("../models/userModel");
var dal_1 = __importDefault(require("../data-access/dal"));
var jwt_helper_1 = __importDefault(require("../utils/jwt-helper"));
var uuid_1 = require("uuid");
var errorModel_1 = __importDefault(require("../models/errorModel"));
var safe_delete_1 = __importDefault(require("../utils/safe-delete"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var register = function (user, file) { return __awaiter(void 0, void 0, void 0, function () {
    var extension, imageName, uploadPath, isAdmin, sql, result, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!file) return [3 /*break*/, 2];
                extension = file.name.substring(file.name.lastIndexOf(".") // .jpg
                );
                imageName = (0, uuid_1.v4)() + extension;
                uploadPath = "./src/uploads/" + imageName;
                user.image = imageName;
                return [4 /*yield*/, file.mv(uploadPath)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!file)
                    user.image = "profile.png";
                isAdmin = process.env.ADMIN_USERNAMES.includes(user.user_name);
                user.role = isAdmin ? userModel_1.Role.Admin : userModel_1.Role.User;
                sql = "\n      INSERT INTO users\n      Values (DEFAULT , '".concat(user.first_name, "', '").concat(user.last_name, "', '").concat(user.user_name, "', '").concat(user.password, "', '").concat(user.image, "', ").concat(user.role, ")\n    ");
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 3:
                result = _a.sent();
                if (!result.insertId)
                    throw new errorModel_1.default(400, "invalid details, please try again");
                user.id = result.insertId;
                delete user.password;
                token = jwt_helper_1.default.getToken(user);
                return [2 /*return*/, token];
        }
    });
}); };
var login = function (userCred) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT * FROM users WHERE user_name = '".concat(userCred.user_name, "' AND password = '").concat(userCred.password, "'");
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                user = _a.sent();
                if (!user[0])
                    throw new errorModel_1.default(401, "invalid details, please try again");
                delete user[0].password;
                delete user[0].token;
                token = jwt_helper_1.default.getToken(user[0]);
                return [2 /*return*/, token];
        }
    });
}); };
var deleteUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result, sql2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM users WHERE user_name = '".concat(user.user_name, "' AND password = '").concat(user.password, "'");
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                result = _a.sent();
                if (!result.affectedRows)
                    throw new errorModel_1.default(401, "wrong details!");
                if (user.image !== "profile.png")
                    (0, safe_delete_1.default)("./src/uploads/".concat(user.image));
                sql2 = "DELETE FROM follows WHERE follower_id = ".concat(user.id);
                return [4 /*yield*/, (0, dal_1.default)(sql2)];
            case 2:
                _a.sent();
                return [2 /*return*/, result.affectedRows];
        }
    });
}); };
var updateFullUser = function (user, prevPass) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result, userToToken, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "UPDATE users SET first_name = '".concat(user.first_name, "', last_name = '").concat(user.last_name, "', \n  user_name = '").concat(user.user_name, "', password = '").concat(user.password, "', image = '").concat(user.image, "', \n  role = ").concat(user.role, " WHERE password = '").concat(prevPass, "' AND user_name = '").concat(user.user_name, "'");
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                result = _a.sent();
                if (!result.affectedRows)
                    throw new errorModel_1.default(401, "wrong details!");
                userToToken = __assign({}, user);
                delete userToToken.password;
                delete userToToken.token;
                token = jwt_helper_1.default.getToken(userToToken);
                return [2 /*return*/, token];
        }
    });
}); };
var updateUserProfile = function (user, file, prevName) { return __awaiter(void 0, void 0, void 0, function () {
    var extension, imageName, uploadPath, sql, result, userToToken, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user.role = +user.role;
                if (prevName !== "profile.png")
                    (0, safe_delete_1.default)("./src/uploads/" + prevName);
                if (!file) return [3 /*break*/, 2];
                extension = file.name.substring(file.name.lastIndexOf(".") // .jpg
                );
                imageName = (0, uuid_1.v4)() + extension;
                uploadPath = "./src/uploads/" + imageName;
                user.image = imageName;
                return [4 /*yield*/, file.mv(uploadPath)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!file)
                    user.image = "profile.png";
                sql = "UPDATE users SET image = '".concat(user.image, "' WHERE id = ").concat(user.id);
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 3:
                result = _a.sent();
                if (!result.affectedRows)
                    throw new errorModel_1.default(404, "something went wrong");
                userToToken = __assign({}, user);
                delete userToToken.token;
                delete userToToken.password;
                token = jwt_helper_1.default.getToken(user);
                return [2 /*return*/, token];
        }
    });
}); };
var deleteAllData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql1, result1, sql2, result2, sql3, result3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql1 = "DELETE FROM users";
                return [4 /*yield*/, (0, dal_1.default)(sql1)];
            case 1:
                result1 = _a.sent();
                sql2 = "DELETE FROM vacations";
                return [4 /*yield*/, (0, dal_1.default)(sql2)];
            case 2:
                result2 = _a.sent();
                sql3 = "DELETE FROM follows";
                return [4 /*yield*/, (0, dal_1.default)(sql3)];
            case 3:
                result3 = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = {
    login: login,
    register: register,
    deleteUser: deleteUser,
    updateFullUser: updateFullUser,
    updateUserProfile: updateUserProfile,
    deleteAllData: deleteAllData,
};
