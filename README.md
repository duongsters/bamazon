# Assigment: bAmazon

![bamazon in action](bamazonGif.gif)

 Summary: bAmazon is an application I created, similar in concept to Amazon.com, an interactive shopping node app where MySQL and Node.JS are used to allow users to purchase items as a customer, view, track and update the product inventory and track the total sales by department. The bAmazon is ran within the 'bamazonCustomer.js' file, allowing user/customer to view the current items available for purchase within the 'products' inventory (located within the 'bamazon.sql' products database file). The user/customer will be prompted, via inquirer npm usage, to select the item they want to purchase and how many items they wish to purchase. Initially as bAmazon is ran--solely through the command line terminal-- it will display to the user/customer the products in bAmazon then prompts the user/customer in which product they would like to purchase by a unique identification number of the item being sold. If the item is in stock, the order will be completed and the user will see the total amount of their purchase. bAmazon also will not only ask for what items the user/customer is interested in, but also the amount quantity of that specific item that they are interested in as well. The inventory will finally update it's inventory based on those two questions prompted to the user/customer. The user/customer has the ability to abort the entire bAmazon application by pressing the 'q' button during the initial question prompts as well.



## Getting Started:
(1) Clone bAmazon repository via Github.com/duongsters/bamazon
(2) Run command line Terminal (or via Gitbash) 'npm install' for required NPMS used within the application
(3) Run command line 'node bamazonCustomer.js' to start up the application
(4) Follow through the directions asked within the CLI
(5) Run 'ctrl + c' to exit the application entirely or 'q' to abort in the middle the running application

## Technologies Used:
- NPM: I used specifically the MySQL, Inquirer and CLI-Table node package managers throughout the entire assigment. MySQL to create the bamazon table database. Inquirer to create the user prompts within the command line terminal. And the CLI-Table npm to create clean tables of the bamazon product
- Node.JS: Basically the engine that runs the NPM packages used as stated above.
- Javascript: Basically used within the main files to render the entire application



## Code Snippet:
```html
<body>
<script>
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

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected with id: " + connection.threadId);
    createTable();
});

var createTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        var table = new Table({
            head: ["item_id", "product_name", "department_name", "price", "stock_quantity"],
            colWidths: [10, 50, 20, 10, 10]
        });
        // console.log(res);
        for (var j = 0; j < res.length; j++) {
            table.push([res[j].item_id,
            res[j].product_name, res[j].department_name,
            res[j].price, res[j].stock_quantity]);
        };

        console.log(table.toString());
        renderUserChoice();
    });
};

function renderUserChoice() {

    inquirer.prompt([
        {
            type: "input",
            name: "userChoice",
            message: "\n\n\nWhat is the ID of the item you would like to to purchase?\n"
        },
        {
            type: "input",
            name: "itemAmount",
            message: "How many would you like? [type 'q' to exit]"
        }
    ])
        .then(function (answers) {
            if (answers.userChoice.toUpperCase() == "Q") {
                console.log("Aw, sad to see you leave...please come again!")
                process.exit();
            }
            if (answers.itemAmount.toUpperCase() == "Q") {
                console.log("Aw, sad to see you leave...please come again!")
                process.exit();
            }
            renderInventory(answers.userChoice, answers.itemAmount);
        });


};
function renderInventory(id, units) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // if(id < 1 || id > res.length) {
        if (res[id - 1] === undefined) {

            console.log("Error! Please enter the correct value of the given choice");
            renderUserChoice();
        }
        else if (units > res[id - 1].stock_quantity) {
            console.log("Not enough in the inventory for this item--please input a value within the inventory range");
        }
        else {
            updateInventory(id, res[id - 1].stock_quantity, units, res[id - 1].product_name, res[id - 1].price);
        }
    });
};

function updateInventory(id, startInventory, units, userPurchase, price) {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: startInventory - units,
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
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
        .then(function (answers) {
            if (answers.askAgain === "Yes") {
                createTable();
            }
            else {
                console.log("Thanks for shopping here at Bamazon!");
                process.exit();
            }
        })
}


</script>
</body>
```

## Author Links:
[GitHub](https://github.com/duongsters)
[LinkIn](https://www.linkedin.com/in/theandrewduong/)