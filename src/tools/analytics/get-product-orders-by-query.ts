/**
 * Инструмент для получения заказов товара по поисковым запросам
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getProductOrdersByQueryTool: ToolDefinition = {
  name: 'wb_get_product_orders_by_query',
  description: 'Получить заказы товара в разрезе поисковых запросов.',
  inputSchema: {
    type: 'object',
    properties: {
      nmID: {
        type: 'number',
        description: 'Артикул WB товара',
      },
      dateFrom: {
        type: 'string',
        description: 'Дата начала периода (YYYY-MM-DD)',
      },
      dateTo: {
        type: 'string',
        description: 'Дата окончания периода (YYYY-MM-DD)',
      },
    },
    required: ['nmID', 'dateFrom', 'dateTo'],
  },
};

export const getProductOrdersByQueryHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting product orders by query', { nmID: params.nmID });
    const response = await wbAnalyticsNewClient.post('/api/v2/search-report/product/orders', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get product orders by query', { error });
    return formatError(error, 'wb_get_product_orders_by_query');
  }
};
