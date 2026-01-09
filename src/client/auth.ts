/**
 * Авторизация для Wildberries API
 */

import { config } from '../config/config.js';

/**
 * Получить заголовки авторизации для запросов к API
 */
export function getAuthHeaders(): Record<string, string> {
  return {
    Authorization: config.apiToken,
    'Content-Type': 'application/json',
  };
}

/**
 * Проверить валидность токена (базовая проверка формата)
 */
export function isTokenValid(token: string): boolean {
  // Токен должен быть непустой строкой
  if (!token || token.trim().length === 0) {
    return false;
  }

  // Базовая проверка: токен не должен быть плейсхолдером
  const placeholders = [
    'your_wildberries_api_token_here',
    'token',
    'api_token',
    'test',
  ];
  
  return !placeholders.some((placeholder) => 
    token.toLowerCase().includes(placeholder)
  );
}

/**
 * Валидация токена при инициализации
 */
export function validateToken(): void {
  if (!isTokenValid(config.apiToken)) {
    throw new Error(
      'Invalid Wildberries API token. ' +
      'Please set WB_API_TOKEN in your .env file. ' +
      'Get your token at: https://seller.wildberries.ru/supplier-settings/access-to-api'
    );
  }
}
