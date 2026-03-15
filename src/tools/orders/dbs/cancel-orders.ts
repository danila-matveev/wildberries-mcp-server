/**
 * Инструмент для отмены заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const cancelOrdersDbsTool: ToolDefinition = {
  name: 'wb_cancel_orders_dbs',
  description:
    'Отменить заказы DBS. Переводит указанные заказы в статус отмены.',
  inputSchema: {
    type: 'object',
    properties: {
      orderIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив идентификаторов заказов для отмены',
      },
    },
    required: ['orderIds'],
  },
};

export const cancelOrdersDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Cancelling DBS orders', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/dbs/orders/status/cancel',
      { orders: orderIds }
    );

    logger.info('DBS orders cancelled successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to cancel DBS orders', { error });
    return formatError(error, 'wb_cancel_orders_dbs');
  }
};
