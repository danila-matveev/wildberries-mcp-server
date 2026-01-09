/**
 * Конфигурация приложения
 */

import { env } from './env.js';

/**
 * Базовый URL для Wildberries API
 */
export const WB_API_BASE_URL = 'https://suppliers-api.wildberries.ru';

/**
 * Базовый URL для статистики и аналитики
 */
export const WB_STATISTICS_API_BASE_URL = 'https://statistics-api.wildberries.ru';

/**
 * Базовый URL для контента
 */
export const WB_CONTENT_API_BASE_URL = 'https://content-api.wildberries.ru';

/**
 * Базовый URL для маркетплейса
 */
export const WB_MARKETPLACE_API_BASE_URL = 'https://marketplace-api.wildberries.ru';

/**
 * Конфигурация rate limiting
 */
export const RATE_LIMIT_CONFIG = {
  maxRequests: 100, // максимум запросов
  windowMs: 60000, // временное окно в миллисекундах (1 минута)
  retryAfter: 5000, // задержка перед повторной попыткой при превышении лимита
};

/**
 * Конфигурация retry логики
 */
export const RETRY_CONFIG = {
  maxRetries: 3, // максимум попыток
  initialDelay: 1000, // начальная задержка в миллисекундах
  maxDelay: 10000, // максимальная задержка
  backoffMultiplier: 2, // множитель для экспоненциального backoff
};

/**
 * Таймауты для запросов
 */
export const TIMEOUT_CONFIG = {
  default: 30000, // 30 секунд
  upload: 120000, // 2 минуты для загрузки файлов
};

/**
 * Конфигурация приложения
 */
export const config = {
  apiToken: env.WB_API_TOKEN,
  nodeEnv: env.NODE_ENV,
  logLevel: env.LOG_LEVEL,
  apiBaseUrl: WB_API_BASE_URL,
  statisticsApiBaseUrl: WB_STATISTICS_API_BASE_URL,
  contentApiBaseUrl: WB_CONTENT_API_BASE_URL,
  marketplaceApiBaseUrl: WB_MARKETPLACE_API_BASE_URL,
  rateLimit: RATE_LIMIT_CONFIG,
  retry: RETRY_CONFIG,
  timeout: TIMEOUT_CONFIG,
} as const;
