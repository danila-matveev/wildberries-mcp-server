/**
 * Инструмент для получения статистики продаж по товарам (воронка v3)
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getProductSalesStatsTool: ToolDefinition = {
  name: 'wb_get_product_sales_stats',
  description: 'Получить статистику продаж по товарам (воронка продаж v3). Поддерживает фильтрацию по артикулам, брендам, тегам и категориям.',
  inputSchema: {
    type: 'object',
    properties: {
      dateFrom: {
        type: 'string',
        description: 'Дата начала периода (YYYY-MM-DD)',
      },
      dateTo: {
        type: 'string',
        description: 'Дата окончания периода (YYYY-MM-DD)',
      },
      nmIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив артикулов WB для фильтрации',
      },
      brandNames: {
        type: 'array',
        items: { type: 'string' },
        description: 'Массив названий брендов для фильтрации',
      },
      tagIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив ID тегов для фильтрации',
      },
      objectIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив ID категорий для фильтрации',
      },
      page: {
        type: 'number',
        description: 'Номер страницы',
      },
      orderBy: {
        type: 'object',
        description: 'Сортировка (поле и направление)',
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getProductSalesStatsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting product sales stats', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbAnalyticsNewClient.post('/api/analytics/v3/sales-funnel/products', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get product sales stats', { error });
    return formatError(error, 'wb_get_product_sales_stats');
  }
};
