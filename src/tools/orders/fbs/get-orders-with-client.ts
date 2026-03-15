/**
 * Инструмент для получения заказов FBS с данными клиента
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getOrdersWithClientTool: ToolDefinition = {
  name: 'wb_get_orders_with_client',
  description:
    'Получить информацию о заказах FBS вместе с данными клиента (ФИО, адрес доставки и т.д.).',
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

export const getOrdersWithClientHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting FBS orders with client info', { orderIds });

    const response = await wbMarketplaceClient.post('/api/v3/orders/client', {
      orders: orderIds,
    });

    logger.info('FBS orders with client info retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS orders with client info', { error });
    return formatError(error, 'wb_get_orders_with_client');
  }
};
