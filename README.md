# LE_DAVID_M2_ESI_2020_SECURITE
The objective of this project is to integrate security into a specific architecture of microservices.

## Architecture
* Front-end --> React & Bootstrap
* Back-end --> Node.js
* Data-Base --> MongoDB
* Dockerizing --> Docker & Nginx


## Docker Run
```
docker-compose up --build
```
## Front-end

* [x] Route config with react-router-dom
* [x] Header
* [x] Login modal form
* [x] Subscribe modal form
* [x] Listen for form submit
* [x] A page with a form to create products (id, item name, item description, photo)
* [x] One page to delete items
* [x] One page to list the articles

## Back-end

* [x] A client-server authentication API must be developed to log in. This same API must be secured in TLS and must be served with nginx
  * [x] a. Use JWT to secure this authentication API to authenticate an user
  * [x] b. These users must be stored in a database (mongo)
  * [x] c. Use an algorithm for signing the token: HS256
  * [x] d. Take into account the expiry of the token
  * [x] e. The generated token must take into account (the header, the payload and the signature)
* [x] Create a second API that will be consumed by the authentication API
  * [x] a. This second API should make it possible to create content through a form, delete it and list it
  * [] b. This API must also be secured in TLS
  * [] c. An API key and a secret sharing key will have to be used for communication between the application and the API.
  bien organiser la config nginx pour la sécurité (ports, TLS, reverse proxy, etc)

  
## Nginx configuration
* [x] Add a configuration in the nginx conf to manage a reverse proxy between the client and the node.js application.
* [] Organise the nginx config well for security (ports, TLS, reverse proxy, etc.)

When calling a service (example: login, register, add article etc...) the frontend application passes through the nginx proxy which was configured at port 8000 of the localhost to access the API service of the backend application.

the backend application uses port 4242.
