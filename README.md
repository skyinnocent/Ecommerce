# Documetation of The App

# Backend

The backend is made with express, following restApi principles.
Their are models admin, seller , product and customer.

# Admin

The admin is the very first model I created.It has a very basic structure with fields like email, password and name. the admin model utilises some functionalities like password checking [combination of letter in small and large caps and special characters and number]. Admin can perform tasks like approving a seller approving a new listing made by a seller. The admin can also suspend or delete a seller or a customer. I intend to implemet a email or sms verification for creation of admin as well.

# ADMIN API's:

createAdmin: method: POST route: http://localhost:<your.port>/api/v1/admin
