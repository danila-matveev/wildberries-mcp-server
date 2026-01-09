/**
 * Базовый HTTP клиент для Wildberries API
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config/config.js';
import { getAuthHeaders, validateToken } from './auth.js';
import { globalRateLimiter } from './rate-limiter.js';
import {
  handleApiError,
  isRetryableError,
  getRetryDelay,
} from './error-handler.js';
import { logger, logRequest, logResponse, logError } from '../utils/logger.js';
import { ApiError } from '../types/common.js';

/**
 * Базовый клиент для работы с Wildberries API
 */
export class WildberriesClient {
  private axiosInstance: AxiosInstance;
  private readonly maxRetries: number;

  constructor(baseURL?: string) {
    // Валидируем токен при создании клиента
    validateToken();

    this.maxRetries = config.retry.maxRetries;

    // Создаём экземпляр axios
    this.axiosInstance = axios.create({
      baseURL: baseURL || config.apiBaseUrl,
      timeout: config.timeout.default,
      headers: getAuthHeaders(),
    });

    // Настраиваем интерсепторы
    this.setupInterceptors();
  }

  /**
   * Настройка интерсепторов для логирования и обработки ошибок
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        logRequest(config.method?.toUpperCase() || 'GET', config.url || '', config.data);
        return config;
      },
      (error) => {
        logError(error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        logResponse(
          response.config.method?.toUpperCase() || 'GET',
          response.config.url || '',
          response.status,
          response.data
        );
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Выполнить запрос с retry логикой и rate limiting
   */
  private async executeWithRetry<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    attempt = 0
  ): Promise<T> {
    try {
      // Применяем rate limiting
      const response = await globalRateLimiter.execute(requestFn);
      return response.data;
    } catch (error) {
      const apiError = this.convertToApiError(error);

      // Проверяем, можем ли мы повторить запрос
      if (attempt < this.maxRetries && isRetryableError(apiError)) {
        const delay = getRetryDelay(attempt);
        logger.warn('Retrying request', {
          attempt: attempt + 1,
          maxRetries: this.maxRetries,
          delay,
          error: apiError.message,
        });

        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.executeWithRetry(requestFn, attempt + 1);
      }

      // Если не можем повторить, бросаем ошибку
      throw apiError;
    }
  }

  /**
   * Конвертировать любую ошибку в ApiError
   */
  private convertToApiError(error: unknown): ApiError {
    try {
      handleApiError(error);
    } catch (e) {
      if (e instanceof ApiError) {
        return e;
      }
      throw e;
    }
    // This should never happen, but TypeScript requires it
    throw new ApiError('Unknown error', 500, 'UNKNOWN_ERROR');
  }

  /**
   * GET запрос
   */
  async get<T = unknown>(url: string, params?: unknown): Promise<T> {
    return this.executeWithRetry(() =>
      this.axiosInstance.get<T>(url, { params })
    );
  }

  /**
   * POST запрос
   */
  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.executeWithRetry(() =>
      this.axiosInstance.post<T>(url, data, config)
    );
  }

  /**
   * PUT запрос
   */
  async put<T = unknown>(url: string, data?: unknown): Promise<T> {
    return this.executeWithRetry(() =>
      this.axiosInstance.put<T>(url, data)
    );
  }

  /**
   * PATCH запрос
   */
  async patch<T = unknown>(url: string, data?: unknown): Promise<T> {
    return this.executeWithRetry(() =>
      this.axiosInstance.patch<T>(url, data)
    );
  }

  /**
   * DELETE запрос
   */
  async delete<T = unknown>(url: string, params?: unknown): Promise<T> {
    return this.executeWithRetry(() =>
      this.axiosInstance.delete<T>(url, { params })
    );
  }

  /**
   * Изменить базовый URL (для разных endpoints API)
   */
  setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  /**
   * Получить текущий базовый URL
   */
  getBaseURL(): string | undefined {
    return this.axiosInstance.defaults.baseURL;
  }
}

/**
 * Глобальный экземпляр клиента для основного API
 */
export const wbClient = new WildberriesClient();

/**
 * Клиент для статистики и аналитики
 */
export const wbStatisticsClient = new WildberriesClient(
  config.statisticsApiBaseUrl
);

/**
 * Клиент для контента
 */
export const wbContentClient = new WildberriesClient(
  config.contentApiBaseUrl
);

/**
 * Клиент для маркетплейса
 */
export const wbMarketplaceClient = new WildberriesClient(
  config.marketplaceApiBaseUrl
);
