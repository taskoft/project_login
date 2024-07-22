# express-jwt-mongo-crud-rest-api

An example REST API built on top of Express

## Features

- RESTful routing
- Generic CRUD Controller
- JWT Authentication
- Authorization by user role

## Routes List:

### User

http://localhost:5000/api/auth/

| Method     | URI                               |
|------------|-----------------------------------|
| `POST`     | `signin`                          | 
| `POST`     | `signup`                          | 


#

http://localhost:5000/api/users/

| Method     | URI                               |
|------------|-----------------------------------|
| `PATCH`    | `update`                          | 
| `DELETE`   | `delete`                          | 
| `GET`      | `balance`                         | 


#
For users balance 
The query to list user balances provides different data depending on the user's role.
And a "Bearer Token" is required for access to endpoint.
(http://localhost:5000/api/users/balance)





