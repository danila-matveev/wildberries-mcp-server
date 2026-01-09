/**
 * Общие типы, используемые во всём приложении
 */

/**
 * Ответ от API с пагинацией
 */
export interface PaginatedResponse<T> {
  data: T[];
  total?: number;
  limit?: number;
  offset?: number;
  hasMore?: boolean;
}

/**
 * Параметры пагинации
 */
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

/**
 * Диапазон дат
 */
export interface DateRange {
  dateFrom: string; // ISO 8601 format
  dateTo: string; // ISO 8601 format
}

/**
 * Базовый ответ от API
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Статус операции
 */
export type OperationStatus = 'success' | 'pending' | 'failed';

/**
 * Метаданные
 */
export interface Metadata {
  timestamp: string;
  requestId?: string;
  [key: string]: unknown;
}

/**
 * Ошибка API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Ошибка rate limiting
 */
export class RateLimitError extends ApiError {
  constructor(
    message: string,
    public retryAfter: number
  ) {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
    this.name = 'RateLimitError';
  }
}
