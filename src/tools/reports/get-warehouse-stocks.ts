/**
 * Инструмент для получения отчёта по остаткам на складах
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getWarehouseStocksTool: ToolDefinition = {
  name: 'wb_get_warehouse_stocks_report',
  description: 'Получить отчёт по остаткам товаров на складах Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      dateFrom: {
        type: 'string',
        description: 'Дата начала отчёта (YYYY-MM-DD)',
      },
    },
    required: ['dateFrom'],
  },
};

export const getWarehouseStocksHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting warehouse stocks report', { dateFrom: params.dateFrom });
    const response = await wbStatisticsClient.get('/api/v1/supplier/stocks', { dateFrom: params.dateFrom });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get warehouse stocks report', { error });
    return formatError(error, 'wb_get_warehouse_stocks_report');
  }
};
