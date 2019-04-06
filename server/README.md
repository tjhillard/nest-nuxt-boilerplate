<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

This project is a Nest.js boilerplate/example application with the following features:

* [JWT](https://jwt.io/) Authentication & Authorization
* Database integration with [TypeORM](https://github.com/typeorm/typeorm) (PostgreSQL, MySQL, NoSQL, & more)
* Type-safe codebase written in [TypeScript](https://www.typescriptlang.org/)
* Webpack Hot Module Reload Configuration
* Caching via [Redis](https://redis.io/)
* Basic policy-based authorization, loosely inspired by [Pundit](https://github.com/varvet/pundit)
* Entity validation with TypeScript [class-validator](https://github.com/typestack/class-validator) package
* API Documentation with [Swagger](https://swagger.io/)
* Several custom utility Guards, Pipes, Decorators & Filters
* Security middleware with [Helmet](https://github.com/helmetjs/helmet)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch (nodemon)
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Docs / Playground

```
http://localhost:3000/api/v1/docs/
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Feedback

Have ideas to improve this project? [Create an issue](https://github.com/tjhillard/nestjs-todos-api/issues/new) and let me know!
