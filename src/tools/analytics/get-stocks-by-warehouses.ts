/**
 * Инструмент для получения остатков по складам
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getStocksByWarehousesTool: ToolDefinition = {
  name: 'wb_get_stocks_by_warehouses',
  description: 'Получить отчёт по остаткам в разрезе складов.',
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

export const getStocksByWarehousesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting stocks by warehouses', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbAnalyticsNewClient.post('/api/v2/stocks-report/offices', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get stocks by warehouses', { error });
    return formatError(error, 'wb_get_stocks_by_warehouses');
  }
};
