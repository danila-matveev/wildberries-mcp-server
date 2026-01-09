/**
 * Валидация переменных окружения
 */

import { z } from 'zod';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

/**
 * Схема для валидации переменных окружения
 */
const envSchema = z.object({
  WB_API_TOKEN: z.string().min(1, 'WB_API_TOKEN is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

/**
 * Тип для переменных окружения
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Валидация и парсинг переменных окружения
 */
function validateEnv(): Env {
  try {
    return envSchema.parse({
      WB_API_TOKEN: process.env.WB_API_TOKEN,
      NODE_ENV: process.env.NODE_ENV || 'development',
      LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((e) => e.path.join('.')).join(', ');
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}\n` +
        'Please create a .env file based on env.example'
      );
    }
    throw error;
  }
}

/**
 * Валидированные переменные окружения
 */
export const env = validateEnv();
