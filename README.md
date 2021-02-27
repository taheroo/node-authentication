# Nodejs Simple Authentication System

## Prerequisites

- [Node JS](https://nodejs.org/)

## Base dependencies

- [express](https://github.com/expressjs/express) minimalist web framework for node.
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme) for password-hashing.
- [body-parser](https://github.com/expressjs/body-parser#readme) as body parsing middleware.
- [helmet](https://github.com/helmetjs/helmet) Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) An implementation of JSON Web Tokens.
- [mongoose](https://github.com/Automattic/mongoose) MongoDB object modeling designed to work in an asynchronous environment.

## How to Install (CLI)

1. Make sure that you have Node.js and npm installed.
2. Clone this repo using `git clone https://github.com/taheroo/node-authentication`
3. Move to the appropriate directory: `cd node-authentication`.</br>
4. Create a `.env` file inside config folder following the example inside `.env.example`
5. Run `npm install` in order to install dependencies.</br>
6. Run `npm start` to start app.
7. You can check authentication endpoints using Postman by importing this collection <https://www.getpostman.com/collections/2fd07df74b3ef749e207>

## Project structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `api`: This folder contains main api configurations.
  - `config`: Folder to set project configurations.
  - `middleware`: Folder that contains all middlewares.
  - `models`: Folder that contains all the mongoose models.
  - `scripts`: Folder that contains all scripts.
  - `app.js`: Entry point of the application.

## Further Reading

- [NodeJS-Learning](https://github.com/sergtitov/NodeJS-Learning)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Token Authentication](https://www.youtube.com/watch?v=UBUNrFtufWo&ab_channel=Fireship)
