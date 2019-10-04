var sql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "BAMAZON"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected with id: " + connection.threadId);
    createTable();
});

var createTable = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        var table = new Table ({
            head: ["item_id", "product_name", "department_name", "price", "stock_quantity"], 
            colWidths: [10, 50, 20, 10, 10]
        });
        // console.log(res);
        for(var j = 0; j <res.length; j++) {
            table.push([res[j].item_id, 
            res[j].product_name, res[j].department_name,
            res[j].price, res[j].stock_quantity]);
        };
        
        console.log(table.toString());
        renderUserChoice();
    });
};

    function renderUserChoice() {
        
        inquirer.prompt ([
            {
                type: "input",
                name: "userChoice",
                message: "\n\n\nWhat is the ID of the item you would like to to purchase?\n"
            },
            {
                type: "input",
                name: "itemAmount",
                message: "How many would you like?"
            }
        ])
        .then(function(answers){
            renderInventory(answers.userChoice, answers.itemAmount);
        });
                

    };
    function renderInventory(id, units) {
        connection.query("SELECT * FROM products", function(err, res) {
            if(err) throw err;
            
            // if(id < 1 || id > res.length) {
                if(res[id - 1] === undefined) {

                console.log("Error! Please enter the correct value of the given choice");
                renderUserChoice();
            }
            else if (units > res[id-1].stock_quantity){
                console.log("Not enough in the inventory for this item--please input a value within the inventory range");
            }
            else {
                updateInventory(id, res[id-1].stock_quantity, units, res[id-1].product_name, res[id-1].price);
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
        function(err, res) {
            console.log("\nSuccess! Here is your receipt of your order: \n" + units + " " + userPurchase + ".");
            console.log("Total Cost: $" + (units * price) + ".\n");
            
            runAgain();

        }
        
        )
}
            function runAgain() {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "askAgain",
                        message: "\n\n\nWould you like to make another purchase from our inventory?\n",
                        choices: ["Yes", "No"]
                    }
                  
                ])
                    .then(function(answers){
                        if(answers.askAgain === "Yes"){
                            createTable();
                        }
                        else {
                            console.log("Thanks for shopping here at Bamazon!");
                        }
                    })
                }
            


