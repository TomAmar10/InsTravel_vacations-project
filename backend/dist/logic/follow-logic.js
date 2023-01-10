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
const dal_1 = __importDefault(require("../data-access/dal"));
const getAllFollows = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT COUNT(follower_id) as followers, vacation_id
  FROM follows
  GROUP BY vacation_id`;
    const vacations = yield (0, dal_1.default)(sql);
    return vacations;
});
const addFollow = (follow) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
  INSERT INTO follows Values (DEFAULT, ${follow.vacation_id}, ${follow.follower_id})
`;
    const result = yield (0, dal_1.default)(sql);
    follow.id = result.insertId;
    return follow;
});
const deleteFollow = (followerId, vacationId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM follows WHERE vacation_id = ${vacationId} AND follower_id = ${followerId}`;
    yield (0, dal_1.default)(sql);
});
exports.default = {
    getAllFollows,
    addFollow,
    deleteFollow,
};
