# express-jwt-mongo-generic-crud-rest-api

An example REST API built on top of Express

## Features

- RESTful routing
- Generic CRUD Controller
- Generic Routers
- JWT Authentication

## Routes List:

### User

| Method     | URI                               |
|------------|-----------------------------------|
| `POST`     | `signIn`                          | 
| `POST`     | `signUp`                          | 

### Customer

| Method     | URI                               | 
|------------|-----------------------------------|
| `GET/HEAD` | `/`                               | 
| `GET/HEAD` | `getById/{id}`                    | 
| `GET/HEAD` | `getCount`                        | 
| `POST`     | `/`                               |
| `PUT`      | `/{id}`                           | 
| `DELETE`   | `/{id}`                           | 

### CustomerTransaction

| Method     | URI                               | 
|------------|-----------------------------------|
| `GET/HEAD` | `/`                               | 
| `GET/HEAD` | `getById/{id}`                    | 
| `GET/HEAD` | `getCount`                        | 
| `GET/HEAD` | `getTotalBalance/{id}`            | 
| `POST`     | `/`                               |
| `PUT`      | `/{id}`                           | 
| `DELETE`   | `/{id}`                           |

### CustomerGroup

| Method     | URI                               | 
|------------|-----------------------------------|
| `GET/HEAD` | `/`                               | 
| `GET/HEAD` | `getById/{id}`                    | 
| `GET/HEAD` | `getCount`                        | 
| `POST`     | `/`                               |
| `PUT`      | `/{id}`                           | 
| `DELETE`   | `/{id}`                           |
