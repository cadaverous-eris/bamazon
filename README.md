# Bamazon
Bamazon is group of node.js programs that accesses a MySQL database with data about various products. Using the bamazon programs, the database can be interacted with in various ways that simulate an online store.

## Bamazon Customer
Bamazon's customer app, bamazonCustomer.js, can be used to make "purchases". It gets a list of items from bamazon's database and displays that list to the user. It then allows the user to input the id of the product they'd like to "purchase", as well as the quantity they wish to order. If the product is out of stock, or if there aren't enough of the product in stock to meet the user's order, then the order will be cancelled. Otherwise, the ordered quantity of the purchased item will be subtracted from the product's total stock quantity on the database.

### Demo
When bamazonCustomer.js is run in the command line or terminal, the user is shown the list of products bamazon sells.
![Bamazon Customer Start](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/customer_start.PNG)

If the user enters in a product id and a quantity, an order will be placed, and they will be shown the total cost of the transaction.
![Order Placed](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/order_placed.PNG)

I just ordered 4 sheets of ceramic fiber insulation. At a cost of $26.99 each, the total was $107.96. When the order was successfully placed, the database was updated to reflect the purchase.

Before this order was placed, there were 91 sheets of ceramic fiber in stock.
![Stock Before Order](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/before_purchase.PNG)
(Look at item #9)

But now that the order was placed, there are only 87 sheets left in stock, because I ordered 4 sheets.
![Stock Before Order](https://github.com/the-realest-stu/bamazon/blob/master/readme_images/after_purchase.PNG)
(Look at item #9)
