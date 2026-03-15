/**
 * Инструмент для получения статусов заказов DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getOrdersStatusesDbwTool: ToolDefinition = {
  name: 'wb_get_orders_statuses_dbw',
  description:
    'Получить статусы заказов DBW по списку идентификаторов.',
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

export const getOrdersStatusesDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBW orders statuses', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/dbw/orders/status',
      { orders: orderIds }
    );

    logger.info('DBW orders statuses retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBW orders statuses', { error });
    return formatError(error, 'wb_get_orders_statuses_dbw');
  }
};
