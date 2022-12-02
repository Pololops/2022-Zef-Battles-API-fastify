# Zef's Battle Game

**A new version of the Zef's Battle Game backend API, developed in TypeScript with Fastify.**

&nbsp;

## The project

This project is the back-end part of the Zef's Battle frontend project. It's a server based on Node.js and Fastify as well as a PostgreSQL database.

&nbsp;

## Start the project

### Back-end

- Create a PostgreSQL database, install [sqitch](https://sqitch.org), configure sqitch configuration in a file named sqitch.conf by copying the sample file.
- Then deploy the database structure with this sqitch command:
 ```sh
 sqitch deploy
 ```
- Configure environment variables in an .env file following the sample file
- Finally, start the API :
```sh
npm start
```
