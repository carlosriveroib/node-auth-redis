import { Context, Next } from 'koa';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        ctx.status = 409;
        ctx.body = { message: 'El email ya está en uso' };
      }
    }

    if (error instanceof ZodError) {
      ctx.status = 401;
      ctx.body = error.issues.map((issue) => issue.message);
    }
  }
}

export { errorMiddleware };
