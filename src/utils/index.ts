import dotenv from 'dotenv';

dotenv.config();

export const __IS_DEV__ = process.env.NODE_ENV === 'development';
