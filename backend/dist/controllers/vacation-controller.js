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
var express_1 = require("express");
var vacation_logic_1 = __importDefault(require("../logic/vacation-logic"));
var safe_delete_1 = __importDefault(require("../utils/safe-delete"));
var uuid_1 = require("uuid");
var verify_role_1 = __importDefault(require("../middleware/verify-role"));
var userModel_1 = require("../models/userModel");
var VacationRouter = (0, express_1.Router)();
VacationRouter.get("/all/followed", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vacations, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vacation_logic_1.default.getFollowedVacations()];
            case 1:
                vacations = _a.sent();
                response.status(200).json(vacations);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
VacationRouter.get("/all/sorted/:userId/:sort/:order", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, sortBy, order, vacations, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = +request.params.userId;
                sortBy = request.params.sort;
                order = request.params.order;
                return [4 /*yield*/, vacation_logic_1.default.getSortedByUserID(userID, sortBy, order)];
            case 1:
                vacations = _a.sent();
                response.status(200).json(vacations);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
VacationRouter.get("/all/price/:userId/:max/:sort/:order", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, max, sortBy, order, vacations, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = +request.params.userId;
                max = +request.params.max;
                sortBy = request.params.sort;
                order = request.params.order;
                return [4 /*yield*/, vacation_logic_1.default.getPriceRange(userID, max, sortBy, order)];
            case 1:
                vacations = _a.sent();
                response.status(200).json(vacations);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
VacationRouter.get("/:id", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, type, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = +request.params.id;
                return [4 /*yield*/, vacation_logic_1.default.getVacation(id)];
            case 1:
                type = _a.sent();
                response.status(200).json(type);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
VacationRouter.get("/destination/:destination", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dest, vacation, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dest = request.params.destination;
                return [4 /*yield*/, vacation_logic_1.default.getVacationByName(dest)];
            case 1:
                vacation = _a.sent();
                response.status(200).json(vacation);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
VacationRouter.post("/add", (0, verify_role_1.default)(userModel_1.Role.Admin), function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vacation, file, extension, imageName, uploadPath, addedVacation, err_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                vacation = request.body;
                file = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                if (!file) return [3 /*break*/, 2];
                extension = file.name.substring(file.name.lastIndexOf(".") // .jpg
                );
                imageName = (0, uuid_1.v4)() + extension;
                uploadPath = "./src/uploads/" + imageName;
                vacation.image = imageName;
                return [4 /*yield*/, file.mv(uploadPath)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                vacation.followers = 0;
                return [4 /*yield*/, vacation_logic_1.default.addVacation(vacation)];
            case 3:
                addedVacation = _b.sent();
                response.status(201).json(addedVacation);
                return [3 /*break*/, 5];
            case 4:
                err_6 = _b.sent();
                next(err_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
VacationRouter.delete("/delete/:id", (0, verify_role_1.default)(userModel_1.Role.Admin), function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vacation, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = +request.params.id;
                return [4 /*yield*/, vacation_logic_1.default.getVacation(id)];
            case 1:
                vacation = _a.sent();
                (0, safe_delete_1.default)("./src/uploads/".concat(vacation[0].image));
                return [4 /*yield*/, vacation_logic_1.default.deleteVacation(id)];
            case 2:
                _a.sent();
                response.sendStatus(204);
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                next(err_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
VacationRouter.put("/update/:id", (0, verify_role_1.default)(userModel_1.Role.Admin), function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var prevImgName, vacation, file, newVacation, err_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                prevImgName = request.body.prevImgName;
                vacation = request.body;
                file = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                vacation.id = +request.params.id;
                return [4 /*yield*/, vacation_logic_1.default.updateVacation(vacation, file, prevImgName)];
            case 1:
                newVacation = _b.sent();
                response.status(200).json(newVacation);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _b.sent();
                next(err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = VacationRouter;
