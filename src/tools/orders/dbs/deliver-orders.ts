/**
 * Инструмент для передачи заказов DBS в доставку
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const deliverOrdersDbsTool: ToolDefinition = {
  name: 'wb_deliver_orders_dbs',
  description:
    'Передать заказы DBS в доставку. Переводит указанные заказы в статус доставки.',
  inputSchema: {
    type: 'object',
    properties: {
      orderIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив идентификаторов заказов для передачи в доставку',
      },
    },
    required: ['orderIds'],
  },
};

export const deliverOrdersDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Delivering DBS orders', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/dbs/orders/status/deliver',
      { orders: orderIds }
    );

    logger.info('DBS orders delivered successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to deliver DBS orders', { error });
    return formatError(error, 'wb_deliver_orders_dbs');
  }
};
