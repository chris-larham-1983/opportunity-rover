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