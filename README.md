# Bamazon
Bamazon is group of node.js programs that accesses a MySQL database with data about various products. Using the bamazon programs, the database can be interacted with in various ways that simulate an online store.

## Bamazon Customer
Bamazon's customer app, bamazonCustomer.js, can be used to make "purchases". It gets a list of items from bamazon's database and displays that list to the user. It then allows the user to input the id of the product they'd like to "purchase", as well as the quantity they wish to order. If the product is out of stock, or if there aren't enough of the product in stock to meet the user's order, then the order will be cancelled. Otherwise, the ordered quantity of the purchased item will be subtracted from the product's total stock quantity on the database.

### Demo
When bamazonCustomer.js is run in the command line or terminal, the user is shown the list of products bamazon sells.
![Bamazon Customer Start](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/customer_start.PNG)

#### Making Purchases
If the user enters in a product id and a quantity, an order will be placed, and they will be shown the total cost of the transaction.
![Order Placed](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/order_placed.PNG)

I just ordered 4 sheets of ceramic fiber insulation. At a cost of $26.99 each, the total was $107.96. When the order was successfully placed, the database was updated to reflect the purchase.

Before this order was placed, there were 91 sheets of ceramic fiber in stock.
![Stock Before Order](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/before_purchase.PNG)
(Look at item #9)

But now that the order was placed, there are only 87 sheets left in stock, because I ordered 4 sheets.
![Stock Before Order](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/after_purchase.PNG)
(Look at item #9)

#### Failed Purchases
If there aren't enough items in stock to fulfill an order, the order will fail, the database won't be modified, and the user will be alerted to that the order was unsuccessful.
![Order Failed](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/order_cancelled.PNG)

## Bamazon Manager
Bamazon's manager app, bamazonManager.js, can be used to manage the Bamazon store. It can be used to view the list of Bamazon's products, but unlike the customer app, it also displays the number of each product left in stock. It can also show a list of only the products with fewer than 5 items left in stock. If any items need to be restocked, the app can be used to add items to any products stock. Finally, the Bamazon manager app can be used to add new products for Bamazon to sell.

### Demo
When bamazonManager.js is run in the command line or terminal, the user is given a list of possible actions.
![Bamazon Manager Start](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/manager_start.PNG)

#### View Products for Sale
Selecting "View Products for Sale" will show all of Bamazon's products, as well as their id, price, and their quantity in stock.
![View Products for Sale](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/view_products.PNG)

#### View Low Inventory
Selecting "View Low Inventory" will show all products with fewer than 5 items in stock. Currently, all products have more than 5 items in stock, which can be seen in the previous image, so instead of showing an empty list, the app displays a message saying that all products have sufficient stock.
![Sufficient Stock](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/no_low_inventory.PNG)

After I've ordered 20 Raspberry Pis and 165 3D Printers, there are now products with fewer than 5 items in stock.
![Low Stock](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/low_inventory.PNG)

#### Add to Inventory
Selecting "Add to Inventory" will prompt the user to input a product id and a quantity, which will then be added to the specified product's stock on the database.
![Add to Inventory](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/add_inventory.PNG)

Previously, there had only been 1 3D Printer in stock due to my ealier purchase of 165 of them. This can be seen in the demonstration of "View Low Inventory". Now that I've added 47 of them to Bamazon's inventory, the database has been updated to show that there are currently 48 3D Printers in stock.
![After Inventory Added](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/after_add_inventory.PNG)
(Look at product #8)

#### Add New Product
Selecting "Add New Product" will prompt the user to input the new product's name, category, price, and quantity currently in stock. After the new product has been added to the database, the user will be alerted that the product was successfully added.
![Add New Product](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/add_product.PNG)

Viewing the list of available products confirms that the new item was added to the database.
![New Product Added](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/after_add_product.PNG)
(The last item is the new one)
