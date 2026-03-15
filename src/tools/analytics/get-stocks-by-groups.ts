/**
 * Инструмент для получения остатков по группам
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getStocksByGroupsTool: ToolDefinition = {
  name: 'wb_get_stocks_by_groups',
  description: 'Получить отчёт по остаткам в разрезе групп товаров.',
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
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getStocksByGroupsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting stocks by groups', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbAnalyticsNewClient.post('/api/v2/stocks-report/products/groups', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get stocks by groups', { error });
    return formatError(error, 'wb_get_stocks_by_groups');
  }
};
