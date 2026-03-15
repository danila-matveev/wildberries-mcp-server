/**
 * Инструмент для отклонения заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const rejectOrdersDbsTool: ToolDefinition = {
  name: 'wb_reject_orders_dbs',
  description:
    'Отклонить заказы DBS. Используется когда клиент отказался от получения заказа.',
  inputSchema: {
    type: 'object',
    properties: {
      orderIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив идентификаторов заказов для отклонения',
      },
    },
    required: ['orderIds'],
  },
};

export const rejectOrdersDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Rejecting DBS orders', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/dbs/orders/status/reject',
      { orders: orderIds }
    );

    logger.info('DBS orders rejected successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to reject DBS orders', { error });
    return formatError(error, 'wb_reject_orders_dbs');
  }
};
