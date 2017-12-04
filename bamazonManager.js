var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "user",
	password: "",
	database: "bamazon",
});

connection.connect(function(err) {
	if (err) throw err;
	
	connected();
});

function connected() {
	inquirer.prompt({
		type: 'list',
		name: "action",
		message: "Select an action",
		choices: [
			{name: "View Products for Sale", value: "viewAll",},
			{name: "View Low Inventory", value: "viewLow",},
			{name: "Add to Inventory", value: "addInv",},
			{name: "Add new Product", value: "addProduct",},
		]
	}).then(answer => {
		switch(answer.action) {
			case "viewAll":
				viewAll();
				break;
			case "viewLow":
				viewLow();
				break;
			case "addInv":
				addInv();
				break;
			case "addProduct":
				addProduct();
				break;
		}
	});
}

function viewAll() {
	connection.query("select item_id as 'id', product_name as 'product', price as 'price', stock_quantity as 'quantity' from products", function(err, res) {
		if (err) throw err;
		
		if (res.length > 0) {
			logProducts(res);
		} else {
			console.log("No products for sale");
		}
		
		disconnect();
	});
}

function viewLow() {
	connection.query("select item_id as 'id', product_name as 'product', price as 'price', stock_quantity as 'quantity' from products where stock_quantity < 5", function(err, res) {
		if (err) throw err;
		
		if (res.length > 0) {
			logProducts(res);
		} else {
			console.log("All products have sufficient stock");
		}
		
		disconnect();
	});
}

function addInv() {
	connection.query("select item_id as 'id', product_name as 'product', price as 'price', stock_quantity as 'quantity' from products", function(err, res) {
		if (err) throw err;
		
		var productIDs = [];
		for (var i = 0; i < res.length; i++) {
			if (res[i].id) productIDs.push(res[i].id);
		}
		
		inquirer.prompt([
			{
				type: 'input',
				name: "item_id",
				message: "Enter the ID of the product",
				validate: function(value) {
					if (isNaN(parseInt(value))) return "Please enter a number";
					if (parseInt(value) != parseFloat(value)) return "Please enter a whole number";
					if (!productIDs.includes(parseInt(value))) return "Please enter a valid product ID";
					return true;
				},
				filter: Number,
			},
			{
				type: 'input',
				name: "quantity",
				message: "Enter the number of items to add to the product's stock quantity",
				validate: function(value) {
					if (isNaN(parseInt(value))) return "Please enter a number";
					if (parseInt(value) != parseFloat(value)) return "Please enter a whole number";
					if (parseInt(value) < 0) return "Please enter a positive number";
					return true;
				},
				filter: Number,
			},
		]).then(answers => {
			var products = res;
			for (var i = 0; i < products.length; i++) {
				if (products[i].id === parseInt(answers.item_id)) {
					connection.query("update products set ? where ?", [{stock_quantity: products[i].quantity + answers.quantity}, {item_id: answers.item_id}], function(err, res) {
						if (err) throw err;
						
						console.log("Inventory successfully modified");
						
						disconnect();
					});
					break;
				}
			}
		});
	});
}

function addProduct() {
	inquirer.prompt([
		{
			type: 'input',
			name: "product_name",
			message: "Enter a name for the product",
			validate: function(value) {
				if (value.length > 150) return "Product names cannot exceed 150 characters";
				if (value.length < 10) return "Product names must have at least 10 characters";
				return true;
			},
		},
		{
			type: 'input',
			name: "department_name",
			message: "Enter the department the product will belong in",
			validate: function(value) {
				if (value.length > 50) return "Product names cannot exceed 50 characters";
				if (value.length < 5) return "Department names must have at least 5 characters";
				return true;
			},
		},
		{
			type: 'input',
			name: "price",
			message: "Enter the product's price",
			validate: function(value) {
				if (isNaN(parseInt(value))) return "Please enter a number";
				if (parseInt(value) < 0) return "Please enter a positive number";
				if (parseInt(value) === 0) return "Products cannot be free";
				return true;
			},
			filter: Number,
		},
		{
			type: 'input',
			name: "stock_quantity",
			message: "Enter the current quantity of the product in stock",
			validate: function(value) {
				if (isNaN(parseInt(value))) return "Please enter a number";
				if (parseInt(value) != parseFloat(value)) return "Please enter a whole number";
				if (parseInt(value) < 0) return "Quantity cannot be less than 0";
				return true;
			},
			filter: Number,
		},
	]).then(answers => {
		connection.query("insert into products set ?", answers, function(err, res) {
			if (err) throw err;
			
			console.log("Product successfully added");
			
			disconnect();
		});
	});
}

function disconnect() {
	connection.end();
}

function logProducts(products) {
	var columns = ["id", "product", "price", "quantity"];
	var columnNames = {id: "ID", product: "Product", price: "Price", quantity: "Stock Quantity"};
	var lengths = {};
	
	for (var i = 0; i < products.length; i++) {
		for (var j = 0; j < columns.length; j++) {
			if (products[i][columns[j]]) {
				var d = products[i][columns[j]];
				if (columns[j] === "price") d = "$" + Number(d).toFixed(2);
				
				lengths[columns[j]] = Math.max((lengths[columns[j]] || columnNames[columns[j]].length), (d + '').length);
			}
		}
	}
		
	var separator = "+-";
	var row = "| ";
	for (var i = 0; i < columns.length; i++) {
		separator += new Array(lengths[columns[i]] + 1).join('-');
		row += columnNames[columns[i]] + new Array(lengths[columns[i]] - (columnNames[columns[i]] + '').length + 1).join(' ');
		
		if (i < columns.length - 1) {
			separator += "-+-";
			row += " | ";
		} else {
			separator += "-+";
			row += " |";
		}
	}
	console.log(separator);
	console.log(row);
	console.log(separator);
	for (var i = 0; i < products.length; i++) {
		row = "| ";
		for (var j = 0; j < columns.length; j++) {
			var d = products[i][columns[j]];
			if (columns[j] === "price") d = "$" + Number(d).toFixed(2);
			
			if (columns[j] === "id" || columns[j] === "quantity") {
				row += new Array(lengths[columns[j]] - (d + '').length + 1).join(' ') + d;
			} else {
				row += d + new Array(lengths[columns[j]] - (d + '').length + 1).join(' ');
			}
			
			if (j < columns.length - 1) {
				row += " | ";
			} else {
				row += " |";
			}
		}
		console.log(row);
	}
	console.log(separator);
}