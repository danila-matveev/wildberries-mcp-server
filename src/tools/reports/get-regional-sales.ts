/**
 * Инструмент для получения продаж по регионам
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getRegionalSalesTool: ToolDefinition = {
  name: 'wb_get_regional_sales',
  description: 'Получить отчёт по продажам в разрезе регионов.',
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
      brandNames: {
        type: 'array',
        items: { type: 'string' },
        description: 'Массив названий брендов для фильтрации',
      },
      objectIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив ID категорий для фильтрации',
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getRegionalSalesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting regional sales', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbStatisticsClient.get('/api/v1/analytics/region-sale', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get regional sales', { error });
    return formatError(error, 'wb_get_regional_sales');
  }
};
