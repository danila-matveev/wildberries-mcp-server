/**
 * Инструмент для получения остатков по размерам
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getStocksBySizesTool: ToolDefinition = {
  name: 'wb_get_stocks_by_sizes',
  description: 'Получить отчёт по остаткам в разрезе размеров конкретного товара.',
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
      nmID: {
        type: 'number',
        description: 'Артикул WB товара',
      },
    },
    required: ['dateFrom', 'dateTo', 'nmID'],
  },
};

export const getStocksBySizesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting stocks by sizes', { nmID: params.nmID });
    const response = await wbAnalyticsNewClient.post('/api/v2/stocks-report/products/sizes', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get stocks by sizes', { error });
    return formatError(error, 'wb_get_stocks_by_sizes');
  }
};
