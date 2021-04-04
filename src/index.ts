import "reflect-metadata";

import ApiApplication from "./ApiApplication";
import { TypeOrm } from "./infra/database/TypeOrm";

(async () => {
  await TypeOrm;

  const apiApplication = await ApiApplication();
  apiApplication.listen(8080, () => {
    console.info("Koa auth-practice application is running.");
  });
})();
