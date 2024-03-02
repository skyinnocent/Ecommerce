# Documetation of The App

# Staring the app

0. Clone the repo.
1. cd to the backend then run "npm i" to get the dependencies. Then run "npm start"
2. cd to the frontend run "npm i". Then run "npm start"

Note: you can change the port and and the DB URI. simply delete existing port and DB URI from teh .env file which is in the backend directory. Then simply put PORT of your choice and a DB URI from mongoDB atlas or localMongoDB.

# Backend

The backend is made with express, following restApi principles.
Their are models admin, seller , product and customer.

# Routes

Instead of seperating the routes into multiple files I have created all routes in the same file. As there are not that many routes.

# Admin

The admin is the very first model I created.It has a very basic structure with fields like email, password and name. the admin model utilises some functionalities like password checking [combination of letter in small and large caps and special characters and number]. Admin can perform tasks like approving a seller approving a new listing made by a seller. The admin can also suspend or delete a seller or a customer. I intend to implemet a email or sms verification for creation of admin as well.

# ADMIN API's:

--> createAdmin: method: POST route: http://localhost:<your.port>/api/v1/admin
payload:{
name:"",
email:"",
password:"",
}  
--> signinAdmin: method: GET route: http://localhost:<your.port>/api/v1/admin
payload:{
email:"",
password:"",
}  
--> updatePassword: method: PUT route: http://localhost:<your.port>/api/v1/admin/:id
payload:{
email:"",
oldPassword:"",
newPassword:"",
}  
--> delteAdmin: mthod: DEL route: http://localhost:<your.port>/api/v1/admin/:id

# note to self: in the FE remember to implement a signin again to delete so that the password gets rechecked. However make the page as if it a password check and not a signin.

## NOTES

--> approveSeller:  
note: If I can have a array of sellers requesting approval. Any time a seller signups the admin (assuming there is one admin). will receive a request. Meaning the admin must have a approval array as well which rill ref the seller. On the admin dashboard we can have the selleersapproval request array populated. From there admin can approve the seller. As the id of the seller will be available since we are reffering it when seller data is created in DB  
--> suspendSeller:  
--> suspendCustomer:  
--> getStats note: {This route will get the stats such as Active seller, Active listing, Active Products, total Customers, total Products in cart, total products in transit, total order processed and total money earned}

--> ## NOTE NOTE:learnt that sending email and password in payload in get request is not secure. Therefore I will need to implement this later on as a part of cleaning up. Will have to add them as query in url.
