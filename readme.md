# lambda-koa-mongo-example

Zombie management RESTish API. A zombie may have maximum 5 items. Items have different prices, which change daily at 00:00 UTC. Zombie info includes its current item worth in PLN, USD and EUR.

The API is deployed as 'zombies' lambda and it caches hits to another 'itemExchange' lambda microservice to get zombie market item prices (in PLN), as well as an external bank API at http://api.nbp.pl/api/exchangerates/tables/C?format=json for USD/EUR exchange rates.

## Docs

[Swagger UI](https://elastic-hugle-7307fd.netlify.com)

## CI/CD

- Mocha/Chai/Sinon/Nock tests with [coverage](https://elastic-hugle-7307fd.netlify.com/coverage/lcov-report/index.html) + build + deploy on AWS Lambda via Netlify Functions.

## Built with

- [Koa](https://koajs.com/) - next generation web framework for Node.js.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [netlify-lambda](https://github.com/netlify/netlify-lambda) - building and serving lambda functions locally and in CI environments.
- [serverless-http](https://github.com/dougmoscrop/serverless-http) - wrap your API for serverless use.

## Requirements

[Node.js](https://nodejs.org/en/) and [MongoDB](https://docs.mongodb.com/manual/installation/) installed.

## Dev

Add .env file with your MONGO_URI and then:

```bash
  npm install
  npm run dev
```

## Test

```
npm test
```

## License

MIT
