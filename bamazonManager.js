// BAMAZON MANAGER INTERFACE

var mysql = require('mysql');

var inquirer = require('inquirer');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
});

var Table = require('easy-table')

function commandMenu() {
    console.log("==========================");
    console.log("WELCOME TO BAMAZON MANAGER");
    console.log("");
    console.log("COMMAND SHORTCUTS:");
    console.log("* View products for sale: 'inv'");
    console.log("* View low inventory: 'low'");
    console.log("* Add to inventory: 'addinv'");
    console.log("* Add new product: 'addprod'");
};

function programStart() {
    con.connect(function (err) {
        if (err) throw err;
    });
    commandMenu();
    programPrompt();
};

function programPrompt() {
    inquirer.prompt([{
        name: "whichProgram",
        message: "What would you like to do?"
    }]).then(function (answers) {
        if ((answers.whichProgram !== "inv") &&
            (answers.whichProgram !== "low") &&
            (answers.whichProgram !== "addinv") &&
            (answers.whichProgram !== "addprod")) {
            console.log("Please enter a valid command.");
            programPrompt();
        } else if (answers.whichProgram === "inv") {
            showItemsForSale();
        } else if (answers.whichProgram === "low") {
            viewLowInventory();
        } else if (answers.whichProgram === "addinv") {
            addToInventory();
        } else if (answers.whichProgram === "addprod") {
            addProduct();
        }
    });
};

programStart();

function showItemsForSale() {
    var data = [];

    var t = new Table;
    console.log("Items for sale:");
    con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        for (var i = 0; i < result.length; i++) {
            var object = {
                item_id: result[i].item_id,
                product_name: result[i].product_name,
                department_name: result[i].department_name,
                price: result[i].price,
                stock_quantity: result[i].stock_quantity,
                product_sales: result[i].product_sales
            };
            data.push(object);
        }
        data.forEach(function (product) {
            t.cell('ID', product.item_id, Table.number(0))
            t.cell('Product Name', product.product_name)
            t.cell('DEPARTMENT', product.department_name)
            t.cell('PRICE, USD', product.price, Table.number(2))
            t.cell('QUANTITY', product.stock_quantity, Table.number(0))
            t.cell('PRODUCT SALES', product.product_sales, Table.number(0))
            t.newRow()
        });
        console.log(t.toString());
        programPrompt();
    });
};

function viewLowInventory() {
    var data = [];

    var t = new Table;
    console.log("Items with low inventory:");
    con.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        for (var i = 0; i < result.length; i++) {
            var object = {
                item_id: result[i].item_id,
                product_name: result[i].product_name,
                department_name: result[i].department_name,
                price: result[i].price,
                stock_quantity: result[i].stock_quantity
            };
            data.push(object);
        }
        data.forEach(function (product) {
            t.cell('ID', product.item_id, Table.number(0))
            t.cell('Product Name', product.product_name)
            t.cell('DEPARTMENT', product.department_name)
            t.cell('PRICE, USD', product.price, Table.number(2))
            t.cell('QUANTITY', product.stock_quantity, Table.number(0))
            t.newRow()
        });
        console.log(t.toString());

        programPrompt();
    });
};

function addToInventory() {
    console.log("ADD TO INVENTORY");
    inquirer.prompt([
        {
            name: "whichItem",
            message: "Enter the ID of the item you wish to update:"
        },
        {
            name: "howManyNewItems",
            message: "How many units will you be adding?"
        }
    ]).then (function (answers) {
        updateInventory(answers.howManyNewItems, answers.whichItem);
        console.log("Inventory Updated");
        showItemsForSale();
    })
};

function addProduct() {
    console.log("ADD A PRODUCT");
    inquirer.prompt([
        {
            name: "productName",
            message: "What is the name of the product?"
        },
        {
            name: "departmentName",
            message: "What department does the product belong to?"
        },
        {
            name: "itemPrice",
            message: "What is the product's retail price?"
        },
        {
            name: "stockQuantity",
            message: "What is the product's starting inventory?"
        }
    ]).then(function (answers) {
        var responses = [];
        responses.push("\"" + answers.productName + "\"");
        responses.push("\"" + answers.departmentName + "\"");
        responses.push(parseInt(answers.itemPrice));
        responses.push(parseInt(answers.stockQuantity));
        responses.push(0);
        // console.log(responses.join(", "));
        con.query("INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES (" + responses.join(", ") + ")", 
        function (err, result, fields) {
            if (err) throw err; 
        });
        console.log("Product added.");
        showItemsForSale();
    });
}

function updateInventory(updateAmount, item_id) {
    con.query("UPDATE products SET stock_quantity = stock_quantity + " + updateAmount + " WHERE item_id = " + item_id, function (err, result, fields) {
    if (err) throw err; 
});
};