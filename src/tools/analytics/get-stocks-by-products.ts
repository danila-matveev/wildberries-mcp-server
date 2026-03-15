/**
 * Инструмент для получения остатков по товарам
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getStocksByProductsTool: ToolDefinition = {
  name: 'wb_get_stocks_by_products',
  description: 'Получить отчёт по остаткам в разрезе товаров.',
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
      groupId: {
        type: 'string',
        description: 'ID группы для фильтрации',
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getStocksByProductsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting stocks by products', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbAnalyticsNewClient.post('/api/v2/stocks-report/products/products', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get stocks by products', { error });
    return formatError(error, 'wb_get_stocks_by_products');
  }
};
