// This file is an experimenting file. The idea here is to create a connection with the 
// database. Ideally, the database would be a tests database in order to manipulate data
// during testing without risking to damage the datas in the web site's database.
// This would allow the QA team to reset the tests database before each individual test in
// order to write and execute independent automated test scripts.   

const Mysql = require("mysql");
const express = require("express");
const uri = "mysql://127.0.0.1:3306";
if (!uri) {
  throw new Error("Missing MYSQL_URI");
}

// Create a connection to the database
const db = Mysql.createConnection(uri);

// Connect to MySQL
async function connect() {
  await db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL server.");
    const app = express(); 
    return app;
  });
}

// const client = new MysqlClient();
// async function connect() {
//   await client.connect();
//   return client.db("rests");
// }

async function disconnect() {
  await db.end();
}

module.exports = {
  connect,
  disconnect,
};
