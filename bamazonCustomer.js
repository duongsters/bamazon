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
});

var createTable = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for(var j = 0; j <res.length; j++) {
            console.log("ID: " + res[j].item_id + 
            " | " + "Item: " + res[j].product_name + 
            " | " + "Price: $" + res[j].price);
        }
    })
}