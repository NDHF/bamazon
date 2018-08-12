// BAMAZON SUPERVISOR INTERFACE

var mysql = require('mysql');

var inquirer = require('inquirer');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
});

var Table = require('easy-table')

function programStart() {
    con.connect(function (err) {
        if (err) throw err;
    });
    commandMenu();
    programPrompt();
};

function commandMenu() {
    console.log("==========================");
    console.log("WELCOME TO BAMAZON SUPERVISOR");
    console.log("");
    console.log("COMMAND SHORTCUTS:");
    console.log("* View products sales by department: 'sales'");
    console.log("* Create new departmnt: 'newdept'");
};

function programPrompt() {
    inquirer.prompt([{
        name: "whichProgram",
        message: "What would you like to do?"
    }]).then(function (answers) {
        if ((answers.whichProgram !== "sales") &&
            (answers.whichProgram !== "newdept")) {
            console.log("Please enter a valid command.");
            programPrompt();
        } else if (answers.whichProgram === "sales") {
            whichDept();
        } else if (answers.whichProgram === "newdept") {
            createNewDepartment();
        }
    });
};

function whichDept() {
    inquirer.prompt([
        {
        name: "whichDepartment",
        message: "Which department do you want to view?"
        }
    ]).then(function (answers) {
        console.log(answers.whichDepartment);
        viewProductsSales(answers.whichDepartment);
    })
}

// "SELECT departments.department_id, departments.overhead_costs FROM departments INNER JOIN products ON departments.department_name=products.department_name"

/* 
SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist
FROM top_albums
INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year= top5000.year)
WHERE (top_albums.artist = “Elvis Presley” AND top5000.artist =  “Elvis Presley”)
ORDER BY top_albums.year;
*/

function viewProductsSales(departmentName) {
    var data = [];

    var t = new Table;
    console.log("Items with low inventory:");
    var queryTest = "SELECT departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales FROM departments INNER JOIN products ON (departments.department_name = products.department_name) WHERE (departments.department_name = " + departmentName + " AND products.department_name = " + departmentName + ")";
    // console.log(queryTest);
    con.query(queryTest, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        for (var i = 0; i < result.length; i++) {
            var object = {
                department_id: result[i].department_id,
                department_name: result[i].department_name,
                overhead_costs: result[i].overhead_costs,
                product_sales: result[i].product_sales,
                total_profit: (result[i].overhead_costs - result[i].product_sales)
            };
            data.push(object);
        }
        data.forEach(function (product) {
            t.cell('DEPARTMENT ID', product.department_id, Table.number(0))
            t.cell('DEPARTMENT NAME', product.department_name)
            t.cell('OVERHEAD COSTS', product.overhead_costs)
            t.cell('PRODUCT SALES', product.product_sales, Table.number(2))
            t.cell('TOTAL PROFIT', product.total_profit, Table.number(0))
            t.newRow()
        });
        console.log(t.toString());

        programPrompt();
    });
};

/*
| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |
*/

function createNewDepartment() {
    // console.log("You chose 'create new department");
    console.log("CREATE A DEPARTMENT");
    inquirer.prompt([
        {
            name: "departmentName",
            message: "What is the name of the department?"
        },
        {
            name: "overheadCosts",
            message: "What is the department's overhead costs?"
        }
    ]).then(function (answers) {
        var responses = [];
        responses.push(answers.departmentName);
        responses.push(answers.overheadCosts);
        con.query("INSERT INTO departments (deparment_name, overhead_costs) VALUES (" + responses.join(", ") + ")",
        function (err, result, fields) {
            if (err) throw err; 
        });
        console.log("Department added.");
        programPrompt();
    });
};

programStart();