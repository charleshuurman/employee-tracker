const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'charleshuurman',
  password: 'Sonas-Lau2',
  database: 'employee_db'
}).promise();

module.exports = connection;
