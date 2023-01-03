import execute from "../2-data-access/dal";
import { OkPacket } from "mysql";
import errorModel from "../1-models/error-model";
import VacationModel from "../1-models/vacation-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../6-utils/safe-delete";

const getAllVacationsByUserId = async (
  userID: number
): Promise<VacationModel[]> => {
  const sql = `SELECT vacations.*, user_vacations.follower_id
  from(
  SELECT * from follows where follower_id =${userID}) as user_vacations
  right join vacations on vacations.id = user_vacations.vacation_id
`;
  const vacations = await execute(sql);
  if (!vacations.length) throw new errorModel(404, "no vacations found");
  return vacations;
};

const getFollowedVacations = async (): Promise<VacationModel[]> => {
  const sql = `SELECT *,
  COUNT(follows.follower_id) as followers, vacation_id
  FROM follows
  JOIN vacations
  ON follows.vacation_id = vacations.id
  GROUP BY vacation_id
  ORDER BY start`;
  const vacations = await execute(sql);
  if (!vacations.length) throw new errorModel(404, "no vacations found");
  return vacations;
};

const getVacation = async (id: number): Promise<VacationModel[]> => {
  const sql = `SELECT * FROM vacations WHERE id = ${id}`;
  const vacation = await execute(sql);
  if (!vacation) throw new errorModel(404, "no vacation found");
  return vacation;
};

const getVacationByDestination = async (
  dest: string
): Promise<VacationModel[]> => {
  const sql = `SELECT * FROM vacations WHERE destination = '${dest}'`;
  const vacation = await execute(sql);
  if (!vacation) throw new errorModel(404, "no vacation found");
  return vacation;
};

const getSortedVacationsByUserID = async (
  userID: number,
  sortBy: string,
  order: string
) => {
  const sql = `SELECT vacations.*, user_vacations.follower_id
  from(
  SELECT * from follows where follower_id =${userID}) as user_vacations
  right join vacations on vacations.id = user_vacations.vacation_id
  ORDER BY vacations.${sortBy} ${order}`;
  const vacations = await execute(sql);
  if (!vacations.length) throw new errorModel(404, "no vacations found");
  return vacations;
};

const getVacationsBetweenPrices = async (
  userID: number,
  max: number,
  sortBy: string,
  order: string
) => {
  const sql = `SELECT vacations.*, user_vacations.follower_id
  from(
  SELECT * from follows where follower_id =${userID}) as user_vacations
  right join vacations on vacations.id = user_vacations.vacation_id
  WHERE price BETWEEN 0 AND ${max}
  ORDER BY vacations.${sortBy} ${order}`;
  const vacations = await execute(sql);
  if (!vacations.length) throw new errorModel(404, "no vacations found");
  return vacations;
};

const addVacation = async (vacation: VacationModel) => {
  const sql = `
  INSERT INTO vacations
  Values (DEFAULT , '${vacation.destination}', '${vacation.description}', '${vacation.image}', '${vacation.start}', '${vacation.finish}',
  ${vacation.price}, ${vacation.followers})
`;
  const result: OkPacket = await execute(sql);
  if (!result.insertId)
    throw new errorModel(404, "wrong details, please try again later");
  vacation.id = result.insertId;
  return vacation;
};

const updateVacation = async (
  vacation: VacationModel,
  file: any,
  prevName: string
) => {
  if (file) {
    safeDelete("./src/uploads/" + prevName);
    const extension = file.name.substring(
      file.name.lastIndexOf(".") // .jpg
    );
    const imageName = uuid() + extension;
    const uploadPath = "./src/uploads/" + imageName;
    vacation.image = imageName;
    await file.mv(uploadPath);
  }
  if (!file) vacation.image = prevName;

  const sql = `UPDATE vacations SET destination = '${vacation.destination}', description = '${vacation.description}',
  image = '${vacation.image}', start = '${vacation.start}', finish = '${vacation.finish}',
  price = ${vacation.price}, followers = ${vacation.followers} WHERE id = ${vacation.id}`;
  const result = await execute(sql);
  if (!result.affectedRows) throw new errorModel(404, "wrong details!");
  return vacation;
};

const deleteVacation = async (id: number) => {
  const sql = `DELETE FROM vacations WHERE id = ${id}`;
  const result = await execute(sql);
  if (!result.affectedRows) throw new errorModel(404, "wrong details!");
  const sql2 = `DELETE FROM follows WHERE vacation_id = ${id}`;
  await execute(sql2);
};

export default {
  getAllVacationsByUserId,
  getFollowedVacations,
  addVacation,
  updateVacation,
  deleteVacation,
  getVacation,
  getVacationByDestination,
  getSortedVacationsByUserID,
  getVacationsBetweenPrices,
};
