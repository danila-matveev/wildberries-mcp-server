/**
 * Инструмент для получения истории статусов сборочных заданий FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getStatusHistoryTool: ToolDefinition = {
  name: 'wb_get_status_history',
  description:
    'Получить историю изменения статусов сборочных заданий FBS по списку идентификаторов заказов.',
  inputSchema: {
    type: 'object',
    properties: {
      orderIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив идентификаторов заказов',
      },
    },
    required: ['orderIds'],
  },
};

export const getStatusHistoryHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting FBS status history', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/orders/status/history',
      { orders: orderIds }
    );

    logger.info('FBS status history retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS status history', { error });
    return formatError(error, 'wb_get_status_history');
  }
};
