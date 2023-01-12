import execute from "../data-access/dal";
import { OkPacket } from "mysql";
import FollowModel from "../models/followModel";

const getAllFollows = async () => {
  const sql = `SELECT COUNT(follower_id) as followers, vacation_id
  FROM follows
  GROUP BY vacation_id`;
  const vacations = await execute(sql);
  return vacations;
};

const addFollow = async (follow: FollowModel) => {
  const sql = `
  INSERT INTO follows Values (DEFAULT, ${follow.vacation_id}, ${follow.follower_id})
`;
  const result: OkPacket = await execute(sql);
  follow.id = result.insertId;
  return follow;
};

const deleteFollow = async (followerId: number, vacationId: number) => {
  const sql = `DELETE FROM follows WHERE vacation_id = ${vacationId} AND follower_id = ${followerId}`;
  await execute(sql);
};

export default {
  getAllFollows,
  addFollow,
  deleteFollow,
};
