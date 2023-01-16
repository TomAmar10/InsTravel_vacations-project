import execute from "../data-access/dal";

const mysql_vacation =
  "CREATE TABLE IF NOT EXISTS vacations (id INT NOT NULL AUTO_INCREMENT, destination VARCHAR(45) NOT NULL, description VARCHAR(100) NOT NULL, image VARCHAR(250) NOT NULL,start DATE NOT NULL, finish DATE NOT NULL, price INT NOT NULL, followers INT NOT NULL, PRIMARY KEY (id))";

const mysql_user =
  "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(45) NOT NULL, last_name VARCHAR(45) NOT NULL,user_name VARCHAR(45) NOT NULL, password VARCHAR(45) NOT NULL, image VARCHAR(250) NOT NULL, role INT NOT NULL, PRIMARY KEY (id))";

const mysql_follow =
  "CREATE TABLE IF NOT EXISTS follows (id INT NOT NULL AUTO_INCREMENT, vacation_id INT NOT NULL, follower_id INT NOT NULL, PRIMARY KEY (id))";

const mySql_init = () => {
  execute(mysql_vacation);
  execute(mysql_user);
  execute(mysql_follow);
};

export default mySql_init;
