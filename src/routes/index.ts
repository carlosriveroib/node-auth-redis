import Router from '@koa/router';

import authV1Router from './auth';

const router = new Router({ prefix: '/api' });

router.use(authV1Router.routes());

export default router;
