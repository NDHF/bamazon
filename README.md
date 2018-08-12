# bamazon
Inventory management using Node and MySQL

# Demonstrations:

* Watch a demo video here: https://youtu.be/EhvXzFKEQiU

# Bamazon Customer

This app allows people to make 'purchases' from a demo inventory. Customers enter
the ID number for an object, and the number of items they want to buy.

The program will then return the product of unit price and number of items purchased.

# Bamazon Manager

This app allows a manager to check inventory (with a 'Product Sales' column), 
view items with low inventory, add to the inventory, and add products.

Each of these functions is can be selected with a short command.

# Bamazon Supervisor

This app allows a supervisor to see the profits of each department,
or add a new department entirely. 

# Technologies Used

* All data is written to and read from a MySQL database. A tool
called Table is used to display the data to the user.

* Table retrieves the MySQL data, stores it in an array, and then
uses the array to populate the table.

* User input is managed using Inquirer. Inquirer provides a 
linear, user-friendly process, by getting input in a 
series of prompts, and using those prompts to provide 
arguments for other functions.