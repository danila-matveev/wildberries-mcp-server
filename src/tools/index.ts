/**
 * Центральный файл для регистрации всех инструментов MCP
 */

import { ToolDefinition, ToolHandler } from '../types/tools.js';
import { productTools, productHandlers } from './products/index.js';
import { orderFbsTools, orderFbsHandlers } from './orders/fbs/index.js';
import { analyticsTools, analyticsHandlers } from './analytics/index.js';

/**
 * Все доступные инструменты MCP
 */
export const allTools: ToolDefinition[] = [
  ...productTools,
  ...orderFbsTools,
  ...analyticsTools,
];

/**
 * Все обработчики инструментов
 */
export const allHandlers: Record<string, ToolHandler> = {
  ...productHandlers,
  ...orderFbsHandlers,
  ...analyticsHandlers,
};

/**
 * Получить инструмент по имени
 */
export function getTool(name: string): ToolDefinition | undefined {
  return allTools.find((tool) => tool.name === name);
}

/**
 * Получить обработчик по имени инструмента
 */
export function getHandler(name: string): ToolHandler | undefined {
  return allHandlers[name];
}

/**
 * Проверить, существует ли инструмент
 */
export function hasTool(name: string): boolean {
  return !!getTool(name);
}
