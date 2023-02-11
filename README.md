# InsTravel - Vacations Tracker by Tom Amar

This application is a vacation tracking and discovery tool made by, < /br>
built as a project for improving skills and study. < /br>
It allows users to browse and follow vacations around the world. < /br>
The application includes an API server built with Node.js, Express, and TypeScript, < /br>
a client built with React and TypeScript with Redux, < /br>
and a MySQL database managed with a Docker Compose file. < /br>

## How To

As admin, you can add / edit vacations and see some information about them, < /br>
logging in with - username: 'admin', password: 'admin123'. < /br>
As user, you can follow any vacation from the list and see it in "my vacations". < /br>
Every user/admin has a his own profile after register, and can delete / edit his profile.

## Installation

To run the project, both server and client sides, and mySql database as well, < /br>
all you need to do is docker-compose up, and it will run automatically, < /br>
with a ready schema and tables, an admin, and a few vacations in it. < /br>
To log in as admin - look at the sqlScripts.sql file. < /br>

Dependencies for the project are located in the package.json file, < /br>
installed once the docker-compose up command has been executed. < /br>

### Local Machine

- To run the application on your local machine, first make yourself a schema in mySql called 'vacation'. < /br>
- Then, change the .env field of 'MY_SQL_HOST' to -> "localhost" < /br>
- After that, there is a optional_init file in the utils, < /br>
- you can execute it by executing this function in the server.ts ---> mySql_init(), < /br>
- it will create the required tables for the database, they will be empty, < /br>
- so start by registering an admin.

### InsTravel link
https://instravel.netlify.app

<div>
<img src="https://user-images.githubusercontent.com/94956589/212173337-3778b51d-b382-41cb-ba5c-ace63ca41a02.png" alt="" width="300" height="250">
<img src="https://user-images.githubusercontent.com/94956589/212175946-a3db17f5-aa76-4111-b49a-54cd4669cafb.png" alt="" width="300" height="250">
<img src="https://user-images.githubusercontent.com/94956589/212176072-dfca880b-7949-40d9-b613-6f0d45a66e05.png" alt="" width="250" height="300">
</div>
