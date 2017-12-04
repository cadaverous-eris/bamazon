drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products(
	item_id int auto_increment not null,
	product_name varchar(150) not null,
	department_name varchar(50) not null,
	price decimal(6, 2) not null,
	stock_quantity int default 0 not null,
	
	primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity) values
	("TIGI Bedhead for Men Matte Separation Workable Wax-2.65 oz.", "Cosmetics", 7.99, 113),
	("Pebble Smartwatch Black", "Electronics", 49.99, 56),
	("Raspberry Pi 3 Model B 2016 Single Board Computer with High Performance Heatsink Set", "Electronics", 37.99, 24),
	("OpenGL Superbible: Comprehensive Tutorial and Reference (7th Edition)", "Books", 45.80, 31),
	("OpenGL 4 Shading Language Cookbook - Second Edition", "Books", 49.59, 41),
	("Philips Norelco Multigroom 5000, 18 attachments, MG5750/49", "Beauty & Personal Care", 25.49, 548),
	("Revlon 1875W Volumizing Hair Dryer", "Beauty & Personal Care", 16.97, 479),
	("LulzBot Mini Desktop 3D Printer", "Electronics", 1100.00, 166),
	("24\" X 12\" X 1\" 2400 F Ceramic Fiber Insulation (kaowool) with CM-Ceramics Knife", "Industrial & Scientific", 26.99, 95),
	("8 Kg ProCast Foundry Clay Graphite Crucible", "Industrial & Scientific", 36.99, 19);