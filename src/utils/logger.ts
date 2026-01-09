/**
 * Настройка логирования с использованием Winston
 */

import winston from 'winston';
import { env } from '../config/env.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Формат для логов
 */
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    // Добавляем метаданные если есть
    if (Object.keys(meta).length > 0) {
      log += ` ${JSON.stringify(meta, null, 2)}`;
    }
    
    // Добавляем stack trace для ошибок
    if (stack) {
      log += `\n${stack}`;
    }
    
    return log;
  })
);

/**
 * Путь к директории с логами
 */
const logsDir = path.resolve(__dirname, '../../logs');

/**
 * Логгер Winston
 */
export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: logFormat,
  transports: [
    // Консольный вывод
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    }),
    // Файл для всех логов
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Отдельный файл для ошибок
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

/**
 * Хелпер для логирования HTTP запросов
 */
export function logRequest(method: string, url: string, data?: unknown) {
  logger.debug('API Request', {
    method,
    url,
    ...(data && { data: sanitizeData(data) }),
  });
}

/**
 * Хелпер для логирования HTTP ответов
 */
export function logResponse(method: string, url: string, status: number, data?: unknown) {
  logger.debug('API Response', {
    method,
    url,
    status,
    ...(data && { data: sanitizeData(data) }),
  });
}

/**
 * Хелпер для логирования ошибок API
 */
export function logError(error: Error, context?: Record<string, unknown>) {
  logger.error('Error occurred', {
    message: error.message,
    stack: error.stack,
    ...context,
  });
}

/**
 * Удаляет чувствительные данные из объекта перед логированием
 */
function sanitizeData(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data } as Record<string, unknown>;
  const sensitiveKeys = ['token', 'password', 'apiKey', 'authorization', 'secret'];

  for (const key of Object.keys(sanitized)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some((sensitive) => lowerKey.includes(sensitive))) {
      sanitized[key] = '***REDACTED***';
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeData(sanitized[key]);
    }
  }

  return sanitized;
}
