
  CREATE TABLE IF NOT EXISTS vacations (id INT NOT NULL AUTO_INCREMENT, destination VARCHAR(45) NOT NULL, description VARCHAR(100) NOT NULL, image VARCHAR(250) NOT NULL,start DATE NOT NULL, finish DATE NOT NULL, price INT NOT NULL, followers INT NOT NULL, PRIMARY KEY (id));

  CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(45) NOT NULL, last_name VARCHAR(45) NOT NULL,user_name VARCHAR(45) NOT NULL, password VARCHAR(45) NOT NULL, image VARCHAR(250) NOT NULL, role INT NOT NULL, PRIMARY KEY (id));

  CREATE TABLE IF NOT EXISTS follows (id INT NOT NULL AUTO_INCREMENT, vacation_id INT NOT NULL, follower_id INT NOT NULL, PRIMARY KEY (id));

-- admin user for beggining:
  INSERT INTO users Values (DEFAULT , 'Tom', 'Amar', 'tomass', 'tom123', 'profile.png', 1);

  INSERT INTO vacations Values (DEFAULT , 'Milano', 'A beautiful place in Italy', 
  'ba3cb2aa-cfcd-4fa1-b2da-fbcb9821d683.jpeg','2023-04-04', '2023-04-10', 2100, 0);

  INSERT INTO vacations Values (DEFAULT , 'Cairo', 'Capital of Egypt', 
  '90f63e25-bf45-41c2-b8a7-1b0c4aad3fb1.jpg','2023-04-19', '2023-04-25', 1400, 0);
  
  INSERT INTO vacations Values (DEFAULT , 'Rio De Janeiro', 'Capital of Brazil', 
  '225689e7-0365-43df-8d00-3cfd30e3e587.webp','2023-05-02', '2023-05-29', 7800, 0);
    
  INSERT INTO vacations Values (DEFAULT , 'Sinai', 'A great place to chill and relax', 
  'bc232a07-152c-4da5-b385-643cf6201e60.webp','2023-05-06', '2023-05-11', 900, 0);
    
  INSERT INTO vacations Values (DEFAULT , 'Budapset', 'Capital of Hungary', 
  'f7fdb473-a68f-46a8-9e75-ad00b6d409a1.jpg','2023-06-01', '2023-06-07', 3400, 0);
  
  INSERT INTO vacations Values (DEFAULT , 'Paris', 'Capital of France', 
  'fbd19f58-949a-4d6a-a551-e9fe5578d65f.jpg','2023-05-13', '2023-05-21', 4600, 0);