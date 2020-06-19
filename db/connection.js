// require mysql

const connection = mysql.creatConnection({
  //host-local host
  //user:
  //pasword
  //database name
});

connection.connect();

module.exports = connection;
