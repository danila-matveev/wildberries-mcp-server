/**
 * Инструмент для получения статусов сборочных заданий FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getOrdersStatusesTool: ToolDefinition = {
  name: 'wb_get_orders_statuses_fbs',
  description:
    'Получить статусы сборочных заданий FBS по списку идентификаторов заказов.',
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

export const getOrdersStatusesHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting FBS orders statuses', { orderIds });

    const response = await wbMarketplaceClient.post('/api/v3/orders/status', {
      orders: orderIds,
    });

    logger.info('FBS orders statuses retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS orders statuses', { error });
    return formatError(error, 'wb_get_orders_statuses_fbs');
  }
};
