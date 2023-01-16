import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createPool({
  host: process.env.NODE_ENV === 'production' ? process.env.MY_SQL_HOST : 'localhost',
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DB,
  port: +process.env.MY_SQL_PORT,
});

const execute = (sql: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export default execute;
