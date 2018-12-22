require('dotenv').config();
const serverless = require('serverless-http');
const { createOrReuseDBConnection } = require('./zombies/db');
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const zombieRouter = require('./zombies/router');
zombieRouter.prefix(require('../config').apiPrefix);

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(async function(ctx, next) {
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  ctx.callbackWaitsForEmptyEventLoop = false;

  // do not put this in try/catch as it's better for the lambda to die fast in case of db conn problem
  // see https://github.com/Automattic/mongoose/issues/6975
  await createOrReuseDBConnection();

  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };

    ctx.app.emit('error', err, ctx);
  }
});

app.use(zombieRouter.routes()).use(zombieRouter.allowedMethods());

app.on('error', function(err) {
  if (process.env.NODE_ENV != 'test') {
    console.log(err);
  }
});

module.exports = {
  app, // for tests
  handler: serverless(app), // for lambda
};
