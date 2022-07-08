import { Context } from 'koa';
import { PrismaClient } from '@prisma/client';
import Bcrypt from 'bcrypt';
import { z } from 'zod';

import { __IS_DEV__ } from '../../utils';
import { createSession } from '../../utils/redis';

const prisma = new PrismaClient();

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function signUp(ctx: Context) {
  const { email, password } = SignUpSchema.parse(ctx.request.body);
  const hashedPassword = await Bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  // No tenemos por que crear una sesión cuando se registre, esto es cuando hace login!!!
  // const sid = await createSession(user.email);

  // ctx.cookies.set('sid', sid, { secure: !__IS_DEV__ }); // secure tiene que ser true cuando esté en pro
  ctx.body = { email: user.email };
}

export { signUp };
