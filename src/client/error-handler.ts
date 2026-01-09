/**
 * Обработка ошибок Wildberries API
 */

import { AxiosError } from 'axios';
import { ApiError, RateLimitError } from '../types/common.js';
import { logger, logError } from '../utils/logger.js';

/**
 * Обработать ошибку от Axios/API
 */
export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status || 500;
    const errorData = error.response?.data;
    
    // Логируем ошибку
    logError(error, {
      url: error.config?.url,
      method: error.config?.method,
      statusCode,
      responseData: errorData,
    });

    // Rate limit error
    if (statusCode === 429) {
      const retryAfter = parseInt(
        error.response?.headers['retry-after'] || '60',
        10
      );
      throw new RateLimitError(
        'Rate limit exceeded. Too many requests to Wildberries API.',
        retryAfter * 1000
      );
    }

    // Authentication error
    if (statusCode === 401 || statusCode === 403) {
      throw new ApiError(
        'Authentication failed. Please check your API token.',
        statusCode,
        'AUTH_ERROR',
        errorData
      );
    }

    // Not found
    if (statusCode === 404) {
      throw new ApiError(
        'Resource not found.',
        statusCode,
        'NOT_FOUND',
        errorData
      );
    }

    // Bad request
    if (statusCode === 400) {
      const message = errorData?.message || 'Invalid request parameters.';
      throw new ApiError(
        message,
        statusCode,
        'BAD_REQUEST',
        errorData
      );
    }

    // Server error
    if (statusCode >= 500) {
      throw new ApiError(
        'Wildberries API server error. Please try again later.',
        statusCode,
        'SERVER_ERROR',
        errorData
      );
    }

    // Generic API error
    const message = errorData?.message || error.message || 'API request failed';
    throw new ApiError(
      message,
      statusCode,
      'API_ERROR',
      errorData
    );
  }

  // Network error
  if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
    logError(error);
    throw new ApiError(
      'Cannot connect to Wildberries API. Please check your internet connection.',
      0,
      'NETWORK_ERROR'
    );
  }

  // Timeout error
  if (error instanceof Error && error.message.includes('timeout')) {
    logError(error);
    throw new ApiError(
      'Request timeout. Wildberries API did not respond in time.',
      0,
      'TIMEOUT_ERROR'
    );
  }

  // Unknown error
  if (error instanceof Error) {
    logError(error);
    throw new ApiError(
      error.message,
      500,
      'UNKNOWN_ERROR'
    );
  }

  // Very unknown error
  logger.error('Unknown error type', { error });
  throw new ApiError(
    'An unknown error occurred',
    500,
    'UNKNOWN_ERROR',
    error
  );
}

/**
 * Проверить, является ли ошибка временной (retry-able)
 */
export function isRetryableError(error: ApiError): boolean {
  // Rate limit errors - можем повторить после ожидания
  if (error instanceof RateLimitError) {
    return true;
  }

  // Server errors (5xx) - можем повторить
  if (error.statusCode >= 500) {
    return true;
  }

  // Network errors - можем повторить
  if (error.code === 'NETWORK_ERROR') {
    return true;
  }

  // Timeout errors - можем повторить
  if (error.code === 'TIMEOUT_ERROR') {
    return true;
  }

  // Остальные ошибки (4xx) не retry-able
  return false;
}

/**
 * Получить задержку для retry с экспоненциальным backoff
 */
export function getRetryDelay(attempt: number): number {
  const baseDelay = 1000; // 1 секунда
  const maxDelay = 30000; // 30 секунд
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  
  // Добавляем jitter (случайное отклонение до 10%)
  const jitter = delay * 0.1 * Math.random();
  
  return delay + jitter;
}
