DROP DATABASE IF EXISTS BAMAZON;

CREATE DATABASE BAMAZON;

USE BAMAZON;

CREATE TABLE products(
	item_id integer(100) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2),
    stock_quantity INTEGER(100),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Macbook Pro", "Electronics", 1300.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("DSLR Camera", "Electronics", 500.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("1 pound Japanese A5 Beef Wagyu", "Food", 300.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("iPhone 11 128gb Unlocked", "Electronics", 749.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Standard Memory Foam Mattress", "Furniture", 500.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("High-End Designer Track Suit", "Apperal", 150.00, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Crate of Facial Tissues", "Neccesities", 39.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Crate of Instant Ramen", "Food", 9.96, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("High-End Throw Blanket", "Necessities", 27.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Standard 7-Piece Dining Set", "Furniture", 799.99, 80);