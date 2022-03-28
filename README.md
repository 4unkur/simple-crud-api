# Simple CRUD API Using Pure NodeJS

## Installation

Clone the repository, navigate to the project's folder:
```sh
git clone https://github.com/4unkur/simple-crud-api.git
cd simple-crud-api
```
Install the dependencies
```sh
npm i
```
Copy the environment file:
```sh
cp .env.example .env
```
By default port 3000 is set. You can change it in the .env file

## Usage

In order to run the application in development mode you can run
```sh
npm run start:dev
```
It will utilize nodemon under the hood

In order to run the application in production mode you can run
```sh
npm run start:prod
```
It will build the application in the `build` directory and run the application

## API

The API has several endpoints:

API path `/person`:

* **GET** `/person` or `/person/${personId}` will return all persons or person with corresponding `personId`
* **POST** `/person` is used to create record about new person and store it in database
* **PUT** `/person/${personId}` is used to update record about existing person
* **DELETE** `/person/${personId}` is used to delete record about existing person from database
    
Persons are stored as `objects` that have following properties:

* `id` — unique identifier (`string`, `uuid`) generated on server side
* `name` — person's name (`string`, **required**)
* `age` — person's age (`number`, **required**)
* `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
    
API is RESTful by design, so it will return corresponding http status codes:

* `200` - OK
* `201` - Created
* `204` - No-Content
* `400` - Bad Request
* `404` - Not Found
* `500` - Server Error

Example Requests using Postman

Create a person:
![Postman 2021-11-27 23-49-54](https://user-images.githubusercontent.com/7892851/143691611-5d9cb4ee-6796-42a4-b0b2-9270ed8f3adb.jpg)
Fetching a person by id:
![Postman 2021-11-27 23-51-28](https://user-images.githubusercontent.com/7892851/143691640-8ecb8482-0064-4754-add0-fab94c780a67.jpg)


## Tests

In order to run the test just run
```sh
npm run test
```
No need to boot up the server to perform end-to-end testing. It will boot up the server itself
