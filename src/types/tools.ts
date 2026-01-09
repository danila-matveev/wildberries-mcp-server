/**
 * Типы для MCP инструментов
 */

import { z } from 'zod';

/**
 * Параметры инструмента MCP
 */
export interface ToolParams {
  [key: string]: unknown;
}

/**
 * Ответ инструмента MCP
 */
export interface ToolResponse {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}

/**
 * Определение инструмента MCP
 */
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

/**
 * Хэндлер инструмента
 */
export type ToolHandler = (params: ToolParams) => Promise<ToolResponse>;

/**
 * Схемы для валидации параметров инструментов товаров
 */
export const ProductToolSchemas = {
  getProducts: z.object({
    limit: z.number().int().positive().max(1000).optional().default(100),
    offset: z.number().int().nonnegative().optional().default(0),
    search: z.string().optional(),
    brandID: z.number().int().positive().optional(),
    updatedAtFrom: z.string().datetime().optional(),
    updatedAtTo: z.string().datetime().optional(),
  }),

  updateContent: z.object({
    nmID: z.number().int().positive(),
    title: z.string().optional(),
    description: z.string().optional(),
    characteristics: z
      .array(
        z.object({
          id: z.number().int().positive(),
          name: z.string(),
          value: z.union([z.string(), z.number()]),
        })
      )
      .optional(),
  }),

  updatePrice: z.object({
    nmID: z.number().int().positive(),
    price: z.number().positive(),
    discount: z.number().int().min(0).max(100).optional(),
  }),

  updateStock: z.object({
    nmID: z.number().int().positive(),
    warehouseID: z.number().int().positive(),
    quantity: z.number().int().nonnegative(),
  }),
};

/**
 * Схемы для валидации параметров инструментов заказов
 */
export const OrderToolSchemas = {
  getOrders: z.object({
    dateFrom: z.string().datetime(),
    dateTo: z.string().datetime(),
    status: z
      .enum(['new', 'confirm', 'complete', 'cancel', 'cancel_by_client'])
      .optional(),
    take: z.number().int().positive().max(1000).optional().default(100),
    skip: z.number().int().nonnegative().optional().default(0),
  }),

  getPickingTasks: z.object({
    dateFrom: z.string().datetime(),
    dateTo: z.string().datetime(),
    status: z
      .enum(['new', 'confirm', 'complete', 'cancel', 'cancel_by_client'])
      .optional(),
  }),

  updateStatus: z.object({
    orderUID: z.string().min(1),
    status: z.enum(['new', 'confirm', 'complete', 'cancel', 'cancel_by_client']),
  }),
};

/**
 * Схемы для валидации параметров инструментов аналитики
 */
export const AnalyticsToolSchemas = {
  getSearchQueries: z.object({
    dateFrom: z.string().datetime(),
    dateTo: z.string().datetime(),
    nmID: z.number().int().positive().optional(),
  }),

  getStockHistory: z.object({
    dateFrom: z.string().datetime(),
    dateTo: z.string().datetime(),
    nmID: z.number().int().positive(),
  }),

  getSalesFunnel: z.object({
    dateFrom: z.string().datetime(),
    dateTo: z.string().datetime(),
    nmID: z.number().int().positive().optional(),
  }),
};
