const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todo_app'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected.");
});

module.exports = connection;