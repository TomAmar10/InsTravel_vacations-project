import mysql from "mysql";
import config from "../utils/config";

const connection = mysql.createPool({
  host: config.mySQLhost, // 127.0.0.1
  user: config.mySQLUser, // root
  password: config.mySQLPassword, // 12345678
  database: config.mySqlDB, //vacation
  port: config.mySqlPort, //3306
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
