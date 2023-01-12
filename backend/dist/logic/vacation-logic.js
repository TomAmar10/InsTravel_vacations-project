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
const error_model_1 = __importDefault(require("../models/error-model"));
const uuid_1 = require("uuid");
const safe_delete_1 = __importDefault(require("../utils/safe-delete"));
const getFollowedVacations = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT *,
  COUNT(follows.follower_id) as followers, vacation_id
  FROM follows
  JOIN vacations
  ON follows.vacation_id = vacations.id
  GROUP BY vacation_id`;
    const vacations = yield (0, dal_1.default)(sql);
    if (!vacations.length)
        throw new error_model_1.default(204, "no vacations found");
    return vacations;
});
const getVacation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM vacations WHERE id = ${id}`;
    const vacation = yield (0, dal_1.default)(sql);
    if (!vacation)
        throw new error_model_1.default(204, "no vacation found");
    return vacation;
});
const getVacationByName = (dest) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM vacations WHERE destination = '${dest}'`;
    const vacation = yield (0, dal_1.default)(sql);
    if (!vacation)
        throw new error_model_1.default(204, "no vacation found");
    return vacation;
});
const getSortedByUserID = (userID, sortBy, order) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT vacations.*, user_vacations.follower_id
  from(
  SELECT * from follows where follower_id =${userID}) as user_vacations
  right join vacations on vacations.id = user_vacations.vacation_id
  ORDER BY vacations.${sortBy} ${order}`;
    const vacations = yield (0, dal_1.default)(sql);
    if (!vacations.length)
        throw new error_model_1.default(204, "no vacations found");
    return vacations;
});
const getPriceRange = (userID, max, sortBy, order) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT vacations.*, user_vacations.follower_id
  from(
  SELECT * from follows where follower_id =${userID}) as user_vacations
  right join vacations on vacations.id = user_vacations.vacation_id
  WHERE price BETWEEN 0 AND ${max}
  ORDER BY vacations.${sortBy} ${order}`;
    const vacations = yield (0, dal_1.default)(sql);
    if (!vacations.length)
        throw new error_model_1.default(204, "no vacations found");
    return vacations;
});
const addDay = (date) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate.toISOString().split(".")[0].replace("T", " ");
};
const addVacation = (vacation) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
  INSERT INTO vacations
  Values (DEFAULT , '${vacation.destination}', '${vacation.description}', '${vacation.image}',
   '${addDay(vacation.start)}', '${addDay(vacation.finish)}', ${vacation.price}, ${vacation.followers})
`;
    const result = yield (0, dal_1.default)(sql);
    if (!result.insertId)
        throw new error_model_1.default(404, "wrong details, please try again");
    vacation.id = result.insertId;
    return vacation;
});
const updateVacation = (vacation, file, prevName) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        (0, safe_delete_1.default)("./src/uploads/" + prevName);
        const extension = file.name.substring(file.name.lastIndexOf(".") // .jpg
        );
        const imageName = (0, uuid_1.v4)() + extension;
        const uploadPath = "./src/uploads/" + imageName;
        vacation.image = imageName;
        yield file.mv(uploadPath);
    }
    if (!file)
        vacation.image = prevName;
    const sql = `UPDATE vacations SET destination = 
  '${vacation.destination}', description = '${vacation.description}',
  image = '${vacation.image}', start = '${addDay(vacation.start)}',
  finish = '${addDay(vacation.finish)}', price = ${vacation.price},
  followers = ${vacation.followers} WHERE id = ${vacation.id}
  `;
    const result = yield (0, dal_1.default)(sql);
    if (!result.affectedRows)
        throw new error_model_1.default(404, "wrong details!");
    return vacation;
});
const deleteVacation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM vacations WHERE id = ${id}`;
    const result = yield (0, dal_1.default)(sql);
    if (!result.affectedRows)
        throw new error_model_1.default(404, "wrong details!");
    const sql2 = `DELETE FROM follows WHERE vacation_id = ${id}`;
    yield (0, dal_1.default)(sql2);
});
exports.default = {
    getFollowedVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    getVacation,
    getVacationByName,
    getSortedByUserID,
    getPriceRange,
};
