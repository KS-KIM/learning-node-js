import Application, { ExtendableContext, Next } from 'koa';
import koa from 'koa';
import bodyParser from 'koa-body';
import render from 'koa-ejs';
import { api } from './api';
import Router from 'koa-router';
import dotenv from 'dotenv';
import { db } from './lib/db';
import * as path from 'path';
import { pages } from './pages';

dotenv.config();
const port: number = parseInt(process.env.PORT) || 8080;

const app: Application = new koa();
const router: Router = new Router();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
});

app.use(async (ctx: ExtendableContext, next: Next) => {
  const startTime: number = Date.now();
  await next();
  const endTime: number = Date.now();
  console.log(`elapsed ${endTime - startTime} ms`);
});
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.use('', pages.routes());
router.use('', api.routes()); // base 경로 지정시 router.use(path, routes);

async function initialize() {
  await db();
  app.listen(port, () => {
    console.log(`server is listening to port on ${port}`);
  });
}

void initialize();
