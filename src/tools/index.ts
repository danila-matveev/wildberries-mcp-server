/**
 * Центральный файл для регистрации всех инструментов MCP
 */

import { ToolDefinition, ToolHandler } from '../types/tools.js';
import { productTools, productHandlers } from './products/index.js';
import { priceTools, priceHandlers } from './prices/index.js';
import { orderFbsTools, orderFbsHandlers } from './orders/fbs/index.js';
import { orderDbwTools, orderDbwHandlers } from './orders/dbw/index.js';
import { orderDbsTools, orderDbsHandlers } from './orders/dbs/index.js';
import { analyticsTools, analyticsHandlers } from './analytics/index.js';
import { feedbackTools, feedbackHandlers } from './feedback/index.js';
import { reportTools, reportHandlers } from './reports/index.js';
import { marketingTools, marketingHandlers } from './marketing/index.js';
import { tariffTools, tariffHandlers } from './tariffs/index.js';
import { supplyTools, supplyHandlers } from './supplies/index.js';
import { documentTools, documentHandlers } from './documents/index.js';

/**
 * Все доступные инструменты MCP
 */
export const allTools: ToolDefinition[] = [
  ...productTools,
  ...priceTools,
  ...orderFbsTools,
  ...orderDbwTools,
  ...orderDbsTools,
  ...analyticsTools,
  ...feedbackTools,
  ...reportTools,
  ...marketingTools,
  ...tariffTools,
  ...supplyTools,
  ...documentTools,
];

/**
 * Все обработчики инструментов
 */
export const allHandlers: Record<string, ToolHandler> = {
  ...productHandlers,
  ...priceHandlers,
  ...orderFbsHandlers,
  ...orderDbwHandlers,
  ...orderDbsHandlers,
  ...analyticsHandlers,
  ...feedbackHandlers,
  ...reportHandlers,
  ...marketingHandlers,
  ...tariffHandlers,
  ...supplyHandlers,
  ...documentHandlers,
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
