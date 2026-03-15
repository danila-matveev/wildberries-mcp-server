/**
 * Инструмент для получения поисковых запросов по товару
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getProductSearchTextsTool: ToolDefinition = {
  name: 'wb_get_product_search_texts',
  description: 'Получить поисковые запросы, по которым находят конкретный товар.',
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

export const getProductSearchTextsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting product search texts', { nmID: params.nmID });
    const response = await wbAnalyticsNewClient.post('/api/v2/search-report/product/search-texts', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get product search texts', { error });
    return formatError(error, 'wb_get_product_search_texts');
  }
};
