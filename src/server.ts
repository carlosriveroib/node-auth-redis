import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import dotenv from 'dotenv';

import { errorMiddleware } from './middleware';
import router from './routes';
import { __IS_DEV__ } from './utils';

// Habilitar el uso de variables de entorno del fichero .env
dotenv.config();

const app = new Koa();

//  Habilitar logger sólo en modo desarrollo
if (__IS_DEV__) {
  app.use(logger()).use(router.allowedMethods());
}

// Necesario para leer los bodies en json. Cuando hacemos un post y pasamos un json
app.use(bodyParser());
app.use(errorMiddleware);
app.use(router.routes());
// app.use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
