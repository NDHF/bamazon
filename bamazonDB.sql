CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(45) NOT NULL,
 department_name VARCHAR(45) NOT NULL,
 price INTEGER(10) NOT NULL,
 stock_quantity INTEGER(10) NOT NULL,
 PRIMARY KEY (item_id)
);

#The products table should have each of the following columns:
#item_id (unique id for each product) DONE
#product_name (Name of product) DONE
#department_name DONE
#price (cost to customer) DONE
#stock_quantity (how much of the product is available in stores) DONE

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Used Pink Bathrobe", "Apparel", 15.00, 50)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rare Mint Snowglobe", "Home Decor", 25.00, 50)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smurf TV Tray", "Collectibles", 10.00, 50)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pet Rock", "Toys", 10.00, 50)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alf Alarm Clock", "Collectibles", 20.00, 50)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("William Shatner's Old Toupee", "Collectibles", 50.00, 1)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Slightly Damaged Golf Bag", "Sports Equipment", 10.00, 50)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beanie Babies New With Tags", "Home Decor", 15.00, 5)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rare Mint Snowglobe", "Home Decor", 25.00, 50)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("That Farrah Fawcett Poster", "Home Decor", 10.00, 50)



