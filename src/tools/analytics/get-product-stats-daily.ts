/**
 * Инструмент для получения ежедневной статистики по товарам
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getProductStatsDailyTool: ToolDefinition = {
  name: 'wb_get_product_stats_daily',
  description: 'Получить ежедневную статистику по товарам (история воронки продаж).',
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
      period: {
        type: 'string',
        enum: ['day', 'week'],
        description: 'Период группировки (day или week)',
      },
      page: {
        type: 'number',
        description: 'Номер страницы',
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getProductStatsDailyHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting product stats daily', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbAnalyticsNewClient.post('/api/analytics/v3/sales-funnel/products/history', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get product stats daily', { error });
    return formatError(error, 'wb_get_product_stats_daily');
  }
};
