

const mysql = require("mysql2");

var dbconnect = {
  getConnection: function () {

    var conn = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '1G9r5a6c1E**',
      database: 'store',
    });

    return conn;
  }
};

module.exports = dbconnect;
