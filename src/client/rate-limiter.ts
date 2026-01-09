/**
 * Rate limiter для Wildberries API
 */

import { config } from '../config/config.js';
import { RateLimitError } from '../types/common.js';
import { logger } from '../utils/logger.js';

/**
 * Rate limiter для контроля частоты запросов
 */
export class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests?: number, windowMs?: number) {
    this.maxRequests = maxRequests || config.rateLimit.maxRequests;
    this.windowMs = windowMs || config.rateLimit.windowMs;
  }

  /**
   * Проверить, можно ли выполнить запрос
   */
  canMakeRequest(): boolean {
    const now = Date.now();
    
    // Удаляем старые запросы за пределами временного окна
    this.requests = this.requests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    return this.requests.length < this.maxRequests;
  }

  /**
   * Зарегистрировать выполненный запрос
   */
  recordRequest(): void {
    this.requests.push(Date.now());
  }

  /**
   * Получить время до следующего доступного слота
   */
  getTimeUntilNextSlot(): number {
    if (this.canMakeRequest()) {
      return 0;
    }

    const now = Date.now();
    const oldestRequest = this.requests[0];
    return this.windowMs - (now - oldestRequest);
  }

  /**
   * Ожидать доступности слота для запроса
   */
  async waitForSlot(): Promise<void> {
    while (!this.canMakeRequest()) {
      const waitTime = this.getTimeUntilNextSlot();
      logger.warn('Rate limit reached, waiting', { waitTime });
      await new Promise((resolve) => setTimeout(resolve, waitTime + 100));
    }
  }

  /**
   * Выполнить функцию с учётом rate limit
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    await this.waitForSlot();
    this.recordRequest();
    return fn();
  }

  /**
   * Сбросить счётчик запросов
   */
  reset(): void {
    this.requests = [];
  }

  /**
   * Получить текущее количество запросов в окне
   */
  getCurrentRequestCount(): number {
    const now = Date.now();
    this.requests = this.requests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );
    return this.requests.length;
  }
}

/**
 * Глобальный rate limiter
 */
export const globalRateLimiter = new RateLimiter();
