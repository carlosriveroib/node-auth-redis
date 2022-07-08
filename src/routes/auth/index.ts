import Router from '@koa/router';

import { logIn, signUp } from '../../controllers';

const router = new Router({ prefix: '/v1/auth' });

router.post('/login', logIn);
router.post('/signup', signUp);

export default router;
