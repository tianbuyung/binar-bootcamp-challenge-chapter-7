# challenge-chapter-7

## Description

This project is built to implement Design Pattern (Model-Repository-Service-Controller-Route-View), template engine (express generator), asynchronous and authentication - Challenge Chapter 7

## Installation

1. This app requires [Node.js v16+](https://nodejs.org/en/), [Postgresql v14+](https://www.postgresql.org/download/), [Sequelize v6](https://sequelize.org/) to run.

2. Clone this repository.

   ```sh
   git clone https://gitlab.com/binar-bootcamp-fsw23/challenge-chapter-7
   ```

3. Mount the directory using terminal.

   ```sh
   cd challenge-chapter-7
   ```

4. Install dependencies via terminal

   ```sh
   npm install
   ```

5. Create `.env` file with contents according to the example (see [.env.example](/.env.example)) or your app will running default on PORT=3000

6. Run your postgres application.

7. Create database in your local computer

   ```sh
   npx sequelize-cli db:create
   ```

8. Migrate model into your database

   ```sh
   npx sequelize-cli db:migrate
   ```

9. Start your App via terminal

   ```sh
   npm run start
   ```

## Interaction with App

- You can try restful API for this app on <http://localhost:3000> (it's depend with your port setting) via [postman](https://www.postman.com/)
- You can try register API: <http://localhost:3000/auth/register> with `POST` method
- You can try login API and get your Bearer Token (JWT): <http://localhost:3000/auth/login> with `POST` method
- Then you can play game with create or join room, see more endpoints and you can import this collection: [Challenge-Chapter-7 Postman Collection](/challenge-chapter-7.postman_collection.json)

## Authors

Septian Maulana

## License

[MIT](/LICENSE.md) License
