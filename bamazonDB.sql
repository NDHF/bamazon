CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(45) NOT NULL,
 department_name VARCHAR(45) NOT NULL,
 price INTEGER(10) NOT NULL,
 stock_quantity INTEGER(10) NOT NULL,
 product_sales INTEGER(10) NOT NULL,
 PRIMARY KEY (item_id)
);

#The products table should have each of the following columns:
#item_id (unique id for each product) DONE
#product_name (Name of product) DONE
#department_name DONE
#price (cost to customer) DONE
#stock_quantity (how much of the product is available in stores) DONE

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Used Pink Bathrobe", "Apparel", 15.00, 50, 0)

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Rare Mint Snowglobe", "Home Decor", 25.00, 50, 0)

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Smurf TV Tray", "Collectibles", 10.00, 50, 0)

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Pet Rock", "Toys", 10.00, 50, 0)

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Alf Alarm Clock", "Collectibles", 20.00, 50, 0)

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("William Shatner's Old Toupee", "Collectibles", 50.00, 1, 0)

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Slightly Damaged Golf Bag", "Sports Equipment", 10.00, 50, 0)

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Beanie Babies New With Tags", "Home Decor", 15.00, 5, 0)

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("That Farrah Fawcett Poster", "Home Decor", 10.00, 50, 0)

CREATE TABLE departments (
 department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
 department_name VARCHAR(45) NOT NULL,
 overhead_costs INTEGER(10) NOT NULL,
 PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Electronics", 10000)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Clothing", 60000)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Home Decor", 75000)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Toys", 75000)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Collectibles", 75000)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Sports Equipment", 75000)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Books", 75000)




