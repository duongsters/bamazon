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
        };
        renderUserChoice();
    });

    function renderUserChoice() {
        inquirer.prompt ([
            {
                type: "input",
                name: "userChoice",
                message: "What is the ID of the item you would like to to purchase?"
            },
            {
                type: "input",
                name: "itemAmount",
                message: "How many would you like?"
            }
        ])
        .then(function(answers){

        });

    };
    function renderInventory(id, units) {
        conection.query("SELECT * FROM products", function(err, res) {
            if(err) throw err;
            
            if(res[id-1] == undefined) {
                console.log("Error! Please enter the correct value of the given choices");
                renderUserChoice();
            }
            else if (units > res[id-1].stock_quantity){
                console.log("Not enough in the inventory for this item--please input a value within the inventory range");
            }
            else {
                
            }
        });
    };
    function updateInventory(id, startInventory, units, userPurchase, price){
        connection.query("UPDATE products SET ? WHERE ?", 
        [
            {
                stock_quantity: startInventory - units,
            },
            {
                item_id: id
            }
        ],
        
        )
}
}