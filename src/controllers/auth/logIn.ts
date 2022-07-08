import { Context } from 'koa';
import Bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { __IS_DEV__ } from '../../utils';
import { createSession } from '../../utils/redis';

const prisma = new PrismaClient();

const LogInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function logIn(ctx: Context) {
  const { email, password } = LogInSchema.parse(ctx.request.body);
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  const invalidUserStatus = 401;
  // Localizar este mensaje
  const invalidUserText = 'Nombre de usuario o contraseña incorrectos';

  if (!user) {
    ctx.status = invalidUserStatus;
    ctx.body = invalidUserText;
    return;
  }

  const isValid = await Bcrypt.compare(password, user.password);

  if (!isValid) {
    ctx.status = invalidUserStatus;
    ctx.body = invalidUserText;
    return;
  }

  const sid = await createSession(user.email);
  ctx.cookies.set('sid', sid, { secure: !__IS_DEV__ }); // secure tiene que ser true cuando esté en pro
  ctx.status = 202;
  ctx.body = { email: user.email, sid };
}

export { logIn };
