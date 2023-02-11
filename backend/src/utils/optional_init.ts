import execute from "../data-access/dal";

const mysql_vacation =
  "CREATE TABLE IF NOT EXISTS vacations (id INT NOT NULL AUTO_INCREMENT, destination VARCHAR(45) NOT NULL, description VARCHAR(100) NOT NULL, image VARCHAR(250) NOT NULL,start DATE NOT NULL, finish DATE NOT NULL, price INT NOT NULL, followers INT NOT NULL, PRIMARY KEY (id))";

const mysql_user =
  "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(45) NOT NULL, last_name VARCHAR(45) NOT NULL,user_name VARCHAR(45) NOT NULL, password VARCHAR(45) NOT NULL, image VARCHAR(250) NOT NULL, role INT NOT NULL, PRIMARY KEY (id))";

const mysql_follow =
  "CREATE TABLE IF NOT EXISTS follows (id INT NOT NULL AUTO_INCREMENT, vacation_id INT NOT NULL, follower_id INT NOT NULL, PRIMARY KEY (id))";
const mysql_initials = [
  `INSERT INTO users Values (DEFAULT , 'Mister', 'Admin', 'admin', 'admin123', 'profile.png', 1);`,
  `INSERT INTO vacations Values (DEFAULT , 'Milano', 'A beautiful place in Italy', 'milano.jpeg', '2023-04-04', '2023-04-10', 2100, 0);`,
  `INSERT INTO vacations Values (DEFAULT , 'Cairo', 'Capital of Egypt', 'cairo.jpg', '2023-04-19', '2023-04-25', 1400, 0);`,
  `INSERT INTO vacations Values (DEFAULT , 'Rio De Janeiro', 'Capital of Brazil', 'rio-de-janeiro.webp', '2023-05-02', '2023-05-29', 7800, 0);`,
  `INSERT INTO vacations Values (DEFAULT , 'Sinai', 'A great place to chill and relax', 'sinai.webp', '2023-05-06', '2023-05-11', 900, 0);`,
  `INSERT INTO vacations Values (DEFAULT , 'Budapset', 'Capital of Hungary', 'budapest.jpg', '2023-06-01', '2023-06-07', 3400, 0);`,
  `INSERT INTO vacations Values (DEFAULT , 'Paris', 'Capital of France', 'paris.jpg', '2023-05-13', '2023-05-21', 4600, 0);`,
];

const mySql_init = () => {
  execute(mysql_vacation);
  execute(mysql_user);
  execute(mysql_follow);
  mysql_initials.forEach((i) => execute(i));
};

export default mySql_init;
