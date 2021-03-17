import Koa, { Context } from "koa";

const application = new Koa();

application.use((context: Context) => {
  context.body = "hello, world";
});

application.listen(8080, () => {
  console.info("Koa auth-practice application is started.");
});
