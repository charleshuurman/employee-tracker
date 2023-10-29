const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'charleshuurman',
  password: 'Sonas-Lau2',
  database: 'employee_db'
}).promise();

module.exports = connection;
