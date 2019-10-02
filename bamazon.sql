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