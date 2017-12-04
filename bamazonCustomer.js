
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
	connection.query("select item_id as 'id', product_name as 'product', price as 'price', stock_quantity as 'quantity' from products", function(err, res) {
		if (err) throw err;
		
		logProducts(res);
		
		var productIDs = [];
		for (var i = 0; i < res.length; i++) {
			if (res[i].id) productIDs.push(res[i].id);
		}
		
		orderPrompt(productIDs, res);
	});
}

function orderPrompt(productIDs, products) {
	inquirer.prompt([
		{
			type: 'input',
			name: "item_id",
			message: "Enter the ID of the product you want to purchase",
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
			message: "Enter the quantity of this product you want to purchase",
			validate: function(value) {
				if (isNaN(parseInt(value))) return "Please enter a number";
				if (parseInt(value) != parseFloat(value)) return "Please enter a whole number";
				if (parseInt(value) < 1) return "Quantity cannot be less than 1";
				return true;
			},
			filter: Number,
		},
	]).then(answers => {
		for (var i = 0; i < products.length; i++) {
			if (products[i].id === parseInt(answers.item_id)) {
				if (products[i].quantity < answers.quantity) {
					console.log("Insuffiecient quantity in stock\n\nOrder cancelled");
					return disconnect();
				} else {
					var total = Number(products[i].price * answers.quantity).toFixed(2);
					
					connection.query("update products set ? where ?", [{stock_quantity: products[i].quantity - answers.quantity}, {item_id: parseInt(answers.item_id)},], function(err, res) {
						if (err) throw err;
						
						console.log("Your order has successfully been placed\n\nTotal Cost: $" + total);
						return disconnect();
					});
				}
			}
		}
	});
}

function disconnect() {
	connection.end();
}

function logProducts(products) {
	var columns = ["id", "product", "price"];
	var columnNames = {id: "ID", product: "Product", price: "Price"};
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
		row += columns[i] + new Array(lengths[columns[i]] - (columnNames[columns[i]] + '').length + 1).join(' ');
		
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
			
			if (columns[j] === "id") {
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
