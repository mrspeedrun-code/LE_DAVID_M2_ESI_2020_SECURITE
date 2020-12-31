# LE_DAVID_M2_ESI_2020_SECURITE
The objective of this project is to integrate security into a specific architecture of microservices.

## Architecture
* Front-end --> React & Bootstrap
* Back-end --> Node.js
* Data-Base --> MongoDB
* Dockerizing --> Docker & Nginx

## Docker File
...

## Docker Run
...

## Front-end

* [x] Route config with react-router-dom
* [x] Header
* [] Login modal form
* [] Subscribe modal form
* [] Listen for form submit
* [] A page with a form to create products (id, item name, item description, photo)
* [] One page to delete items
* [] One page to list the articles

## Back-end

* [] A client-server authentication API must be developed to log in. This same API must be secured in TLS and must be served with nginx
  * [] a. Use JWT to secure this authentication API to authenticate an user
  * [] b. These users must be stored in a database (mongo)
  * [] c. Use an algorithm for signing the token: HS256
  * [] d. Take into account the expiry of the token
  * [] e. The generated token must take into account (the header, the payload and the signature)
* [] Create a second API that will be consumed by the authentication API
  * [] a. This second API should make it possible to create content through a form, delete it and list it
  * [] b. This API must also be secured in TLS
  * [] c. An API key and a secret sharing key will have to be used for communication between the application and the API.
  bien organiser la config nginx pour la sécurité (ports, TLS, reverse proxy, etc)

  
## Nginx configuration
* [] Add a configuration in the nginx conf to manage a reverse proxy between the client and the node.js application.
* [] Organise the nginx config well for security (ports, TLS, reverse proxy, etc.)

