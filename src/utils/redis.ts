import Redis from 'ioredis';
import { v4 } from 'uuid';

// Se conecta automáticamente a 127.0.0.1:6379
const redis = new Redis();

async function createSession(email: string): Promise<string> {
  const sid = v4();
  // expiry redis.set(sid, user.email, 'PX', tiempoEnMilisegundos); PX significa que el tiempo es milisegundos.
  await redis.set(sid, email);

  return sid;
}

export { createSession };
