import dotenv from 'dotenv';
import Application from 'koa';
import koa from 'koa';
import bodyParser from 'koa-body';
import render from 'koa-ejs';
import logger from 'koa-logger';
import passport from 'koa-passport';
import Router from 'koa-router';
import session from 'koa-session';
import path from 'path';

import { api } from './api';
import { db } from './lib/db';
import { pages } from './pages';

// koa application configuration
dotenv.config();
const port: number = parseInt(process.env.PORT) || 8080;
const app: Application = new koa();

// ejs configuration
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
});

// session configuration
app.keys = [process.env.SESSION_SECRET_KEY];
app.use(session({}, app));

// authentication configuration
app.use(passport.initialize());
app.use(passport.session());

// body parser configuration
app.use(bodyParser());

// logger configuration
app.use(logger());

// router configuration
const router: Router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());

router.use('', pages.routes());
router.use('', api.routes());

// database connection & server port initialization
async function initialize() {
  await db();
  app.listen(port, () => {
    console.log(`server is listening to port on ${port}`);
  });
}

void initialize();
