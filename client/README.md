# Purpose of Project

I am 99% of the way through <strong>Codecademy</strong>'s <em>Full-Stack Engineer Course</em>.  I have recently 
taken a break from the course in order to solve many coding challenges on <strong>LeetCode</strong> (73 as of 04.11.22).
  To refresh my PERN skills after two months of wrestling with algorithms on <strong>LeetCode</strong>, I followed 
<em>The Stoic Programmers</em>' video tutorial on creating a PERN Todo app (https://www.youtube.com/watch?v=5vF0FGfa0RQ).  

Below are notes that I made while watching the video.  These will serve as a refresher for subsequent projects that I 
embark upon:

## Back-end Notes:

<pre>
* mkdir server (creates a 'server' directory)
* cd server (change directory into 'server')
* npm init (scaffolds out your project - package.json) ['ENTER' repeatedly]
* npm i express pg cors (installs a package that allows client -- server communication)
* npm i -g nodemon (installs a package that automatically restarts the node application when file changes are detected)
* touch index.js (creates a file called 'index.js')
* node index.js (to start application server-side)
* cd ../ (back up one directory)
* touch database.sql (creates a file called 'database.sql')
* [open up command prompt]: PostgreSQL commands
* psql -U postgres (enter the psql command line as User)
* enter password
* \l [list all databases]
* \c {databaseName} [connect to database]
* \c pernstack
* \dt [define relations]
* CREATE TABLE todo(                          //PostgreSQL command to create a table with two fields
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
* \dt
* SELECT * FROM todo;
* [POSTMAN]: tool for testing API endpoints
* body -> raw -> JSON
* res.json === command to get POSTMAN to display return data
* (db.sql, index.js)
</pre>
-----------------------------------------------------------------
## Front-end notes:

<pre>
* (pern-todo-list): directory path
* [npm uninstall -g create-react-app ... npm install create-react-app]: uninstalls old create-react-app and installs new version
* npx create-react-app client [creates a React front-end in the 'client' folder]
* cd client [change into the 'client' directory]
* npm start [start the app]
* [src folder]: cleaning up unnecessary files
* delete logo
* delete app.test.js
* delete serviceWorker.js/reportWebVitals.js
* delete setupTests.js
* delete relevant sections from App.js (just leave the [div className="App">][/div], remove reference to logo) 
  and index.js (remove references to reportWebVitals())
* copy css link to bootstrap 4 from "https://getbootstrap.com/docs/4.0/getting-started/introduction/"
* paste above link into public -> index.html
* remove comments from index.html
* copy JS scripts from website and paste into index.html
* (/d/pern-todo-list/client/src)
* mkdir components (create a 'components' directory inside client/src)
* cd components (change into the 'components' directory)
* touch InputTodo.js (creates a file named 'InputTodo.js')
* touch ListTodos.js (creates a file named 'ListTodos.js')
* touch EditTodo.js (creates a file named 'EditTodo.js')
</pre>

## Deploying to Heroku Notes:

<pre>
* Be sure to push 'package-lock.json' to GitHub as Heroku uses
  the lock files to build the expected dependency tree
* Move all files from the 'server' directory into the <em>root</em>
  directory, then delete the 'server' directory
* Run 'npm run build' in the 'client' directory, to obtain a 'build' folder
* Change 'index.js' port code to: const PORT = process.env.PORT || 5000;
                                  ...
                                  app.listen(PORT, () => {
                                  console.log(`Server is starting on port ${PORT}.`);
* Add this code to 'index.js': const path = require("path"); //join directory paths together
                               if(process.env.NODE_ENV === "production") {
                                    app.use(express.static(path.join(__dirname, "client/build")));
                                 //OR app.use(express.static("client/build"));
                                 //OR app.use("/", express.static("client/build"));   
                               } 
                               ...
                               app.get("*", (req, res) => {
                                    res.sendFile(path.join(__dirname, "client/build/index.html"));
                                });
* npm install dotenv (loads environment variables from .env)
* In '.env' (root folder): PG_USER = postgres
                           PG_PASSWORD = [password]
                           PG_HOST = localhost
                           PG_PORT = 5432
                           PG_DATABASE = pernstack
* In 'db.js': require('dotenv').config();
              const devConfig = {
                user: process.env.PG_USER,
                password: process.env.PG_PASSWORD,
                host: process.env.PG_HOST,
                database: process.env.PG_DATABASE,
                port: process.env.PG_PORT
              };
              const proConfig = {
                connectionString: process.env.DATABASE_URL //heroku addons
              };
              const pool = new Pool(process.env.NODE_ENV === 'production'? proConfig: devConfig);
           OR 
              const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
              const proConfig = process.env.DATABASE_URL;
              const pool = new Pool({
                    connectionString: process.env.NODE_ENV === 'production'? proConfig: devConfig
              });
           From <em>The Stoic Programmers</em>' video on deploying a PERN app to Heroku (https://www.youtube.com/watch?v=ZJxUOOND5_A):
           ~ The Order Heroku runs your scripts: ~
           1. heroku-prebuild script
           2. npm install (reads package.json and sees what dependencies need to be installed)
           3. heroku-postbuild script 
           4. Run start script (node server.js)   
           <strong>package.json:</strong> (previously in the 'server' folder)
           Add this code - 
                "engines": {
                    "node": "16.14.0",
                    "npm": "8.10.0"
                },
                "scripts": {
                    "start": "node index.js",
                    "heroku-postbuild": "cd client && npm install && npm run build"
                },
                ...
                <strong>(client-side package.json:)</strong> 
                ADD: "proxy": "http://localhost:5000"
                "eslintConfig": {
                    "extends": [
                      "react", // <--- DELETE THIS LINE TO AVOID ESLINT CONFLICT ISSUES WHEN DEPLOYING TO HEROKU
                      "react-app/jest"
                    ]
                  }
           <strong>Client-side configuration:</strong>
           ~ client/src/components/EditTodos.js && InputTodos && ListTodos:
           remove 'http://localhost:5000' from fetch requests
           - delete client/node_modules and client/package-lock.json, then run npm install, then turn react application off and then back on
             and that should reset your cache
           (inside .gitignore):
           /node_modules
           .env
           <strong>heroku login</strong>
           <strong>heroku create pern-todo-application</strong>
           <strong>heroku addons:create heroku-postgresql:mini -a pern-todo-application</strong> ($5/month max plan)
           <strong>heroku pg:psql -a pern-todo-application</strong>
           database has been created, so we just need CREATE TABLE todo(
                                                        todo_id SERIAL PRIMARY KEY,
                                                        description VARCHAR(255)
                                                      );
           (other useful commands): DROP TABLE todo;
                                    \q (quit)
                                    cat fileName (prints contents of file) |(pipe contents to... ->) heroku pg:psql pern-todo-application
                                    -- OR /* */ for SQL comments
           
           <strong>heroku git:remote -a pern-todo-application</strong>
           <strong>git push heroku master</strong>
           <strong>heroku open</strong>
</pre>

## GitHub Notes:

<pre>
* git pull origin main --allow-unrelated-histories
* git push origin main
* ls -a (see all files in directory)
* git rm --cached .env
* git rename origin backup
</pre>

## Useful Command Line Commands:
* To write directly to a file: 
<pre>
cat >> fileName.fileExtension << EOF
Text that you want to write...
...to the file
EOF
</pre>