var mysql = require('mysql');

var inquirer = require('inquirer');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
});

var Table = require('easy-table')

var data = [];

var t = new Table;


function showItemsForSale() {
    console.log("WELCOME TO BAMAZON");
    console.log("Items for sale:");

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM products WHERE stock_quantity > 0", function (err, result, fields) {
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
            buyAnItem();
        });
    });
};

function buyAnItem() {
    inquirer.prompt([
        {
            name: "whichItem",
            message: "Enter the ID of the item you would like to buy"
        },
        {
            name: "howMany",
            message: "How many would you like to buy?"
        }
    ]).then(function (answers) {
        console.log("You would like to buy " + answers.howMany + " of item #" + answers.whichItem);
        checkItemAvailability(data, parseInt(answers.whichItem), parseInt(answers.howMany));
    });
}

function checkItemAvailability(array, item_id, howManyAreBeingBought) {
    // console.log(array, item_id, stock_quantity);
    for (var i = 0; i < array.length; i++) {
        if ((array[i].item_id === item_id) && (array[i].stock_quantity < howManyAreBeingBought)) {
            console.log("Sorry, we don't have enough items to complete that order.");
        } else if ((array[i].item_id === item_id) && (array[i].stock_quantity >= howManyAreBeingBought)) {
            console.log("Thank you for your order.");
            console.log("Your total is $" + (parseInt(array[i].price) * parseInt(howManyAreBeingBought)) + ".");
            updateInventory(howManyAreBeingBought, parseInt(item_id));
        }
    }
};

function updateInventory(updateAmount, item_id) {
                con.query("UPDATE products SET stock_quantity = stock_quantity - " + updateAmount + " WHERE item_id = " + item_id, function (err, result, fields) {
                if (err) throw err; 
            });
};

showItemsForSale();
