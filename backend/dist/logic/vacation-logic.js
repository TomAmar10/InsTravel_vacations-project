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
var dal_1 = __importDefault(require("../data-access/dal"));
var errorModel_1 = __importDefault(require("../models/errorModel"));
var uuid_1 = require("uuid");
var safe_delete_1 = __importDefault(require("../utils/safe-delete"));
var getFollowedVacations = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, vacations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT *,\n  COUNT(follows.follower_id) as followers, vacation_id\n  FROM follows\n  JOIN vacations\n  ON follows.vacation_id = vacations.id\n  GROUP BY vacation_id";
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                vacations = _a.sent();
                if (!vacations.length)
                    throw new errorModel_1.default(204, "no vacations found");
                return [2 /*return*/, vacations];
        }
    });
}); };
var getVacation = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, vacation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT * FROM vacations WHERE id = ".concat(id);
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                vacation = _a.sent();
                if (!vacation)
                    throw new errorModel_1.default(204, "no vacation found");
                return [2 /*return*/, vacation];
        }
    });
}); };
var getVacationByName = function (dest) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, vacation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT * FROM vacations WHERE destination = '".concat(dest, "'");
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                vacation = _a.sent();
                if (!vacation)
                    throw new errorModel_1.default(204, "no vacation found");
                return [2 /*return*/, vacation];
        }
    });
}); };
var getSortedByUserID = function (userID, sortBy, order) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, vacations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT vacations.*, user_vacations.follower_id\n  from(\n  SELECT * from follows where follower_id =".concat(userID, ") as user_vacations\n  right join vacations on vacations.id = user_vacations.vacation_id\n  ORDER BY vacations.").concat(sortBy, " ").concat(order);
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                vacations = _a.sent();
                if (!vacations.length)
                    throw new errorModel_1.default(204, "no vacations found");
                return [2 /*return*/, vacations];
        }
    });
}); };
var getPriceRange = function (userID, max, sortBy, order) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, vacations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT vacations.*, user_vacations.follower_id\n  from(\n  SELECT * from follows where follower_id =".concat(userID, ") as user_vacations\n  right join vacations on vacations.id = user_vacations.vacation_id\n  WHERE price BETWEEN 0 AND ").concat(max, "\n  ORDER BY vacations.").concat(sortBy, " ").concat(order);
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                vacations = _a.sent();
                if (!vacations.length)
                    throw new errorModel_1.default(204, "no vacations found");
                return [2 /*return*/, vacations];
        }
    });
}); };
var addDay = function (date) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate.toISOString().split(".")[0].replace("T", " ");
};
var addVacation = function (vacation) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  INSERT INTO vacations\n  Values (DEFAULT , '".concat(vacation.destination, "', '").concat(vacation.description, "', '").concat(vacation.image, "',\n   '").concat(addDay(vacation.start), "', '").concat(addDay(vacation.finish), "', ").concat(vacation.price, ", ").concat(vacation.followers, ")\n");
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                result = _a.sent();
                if (!result.insertId)
                    throw new errorModel_1.default(404, "wrong details, please try again");
                vacation.id = result.insertId;
                return [2 /*return*/, vacation];
        }
    });
}); };
var updateVacation = function (vacation, file, prevName) { return __awaiter(void 0, void 0, void 0, function () {
    var extension, imageName, uploadPath, sql, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!file) return [3 /*break*/, 2];
                (0, safe_delete_1.default)("./src/uploads/" + prevName);
                extension = file.name.substring(file.name.lastIndexOf(".") // .jpg
                );
                imageName = (0, uuid_1.v4)() + extension;
                uploadPath = "./src/uploads/" + imageName;
                vacation.image = imageName;
                return [4 /*yield*/, file.mv(uploadPath)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!file)
                    vacation.image = prevName;
                sql = "UPDATE vacations SET destination = \n  '".concat(vacation.destination, "', description = '").concat(vacation.description, "',\n  image = '").concat(vacation.image, "', start = '").concat(addDay(vacation.start), "',\n  finish = '").concat(addDay(vacation.finish), "', price = ").concat(vacation.price, ",\n  followers = ").concat(vacation.followers, " WHERE id = ").concat(vacation.id, "\n  ");
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 3:
                result = _a.sent();
                if (!result.affectedRows)
                    throw new errorModel_1.default(404, "wrong details!");
                return [2 /*return*/, vacation];
        }
    });
}); };
var deleteVacation = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, result, sql2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM vacations WHERE id = ".concat(id);
                return [4 /*yield*/, (0, dal_1.default)(sql)];
            case 1:
                result = _a.sent();
                if (!result.affectedRows)
                    throw new errorModel_1.default(404, "wrong details!");
                sql2 = "DELETE FROM follows WHERE vacation_id = ".concat(id);
                return [4 /*yield*/, (0, dal_1.default)(sql2)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = {
    getFollowedVacations: getFollowedVacations,
    addVacation: addVacation,
    updateVacation: updateVacation,
    deleteVacation: deleteVacation,
    getVacation: getVacation,
    getVacationByName: getVacationByName,
    getSortedByUserID: getSortedByUserID,
    getPriceRange: getPriceRange,
};
