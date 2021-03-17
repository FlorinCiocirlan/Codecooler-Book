# Codecooler-Book

### You must have docker for desktop installed on your machine
 After instalation fork the project and run the following command "docker-compose up --build -d" in terminal inside the root directory "path/Codecooler-Book"
 When containers are up and running you must run run this command "docker-compose exec php sh" in order to open a shell inside the php container.
 When shell opened run this command "php bin/console doctrine:schema:create"

### Now you are ready to use the application

# Codecooler Book 
 It is planned to be a social media platform where users can create an account and connect with people around the world.
 Users can register and log into the aplication
 Users can customize their profile details

## The application architecture is based on microservices
 The communication between services is done through REST API
 The authentication service communicates with the front-end react-app through a websocket

### Technologies used in this app:
 - React
 - Symfony
 - Postgresql
 - Mongodb
 - AWS S3 service for file storage
 - SockJS package for websocket creation
 
