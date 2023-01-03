import mysql from "mysql";
import config from "../6-utils/config";

const connection = mysql.createPool({
  host: config.mySQLhost,
  user: config.mySQLUser,
  password: config.mySQLPassword,
  database: config.mySqlDB,
  port: config.mySqlPort,
});

const execute = (sql: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export default execute;
