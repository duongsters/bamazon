var sql = require("mysql");
var inquirer = require("inquirer");

var connectiom = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "BAMAZON"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected with id: " + connection.threadId);
})