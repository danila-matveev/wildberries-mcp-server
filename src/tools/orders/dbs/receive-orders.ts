/**
 * Инструмент для подтверждения получения заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const receiveOrdersDbsTool: ToolDefinition = {
  name: 'wb_receive_orders_dbs',
  description:
    'Подтвердить получение заказов DBS клиентом. Переводит заказы в статус "получен".',
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

export const receiveOrdersDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Receiving DBS orders', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/dbs/orders/status/receive',
      { orders: orderIds }
    );

    logger.info('DBS orders received successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to receive DBS orders', { error });
    return formatError(error, 'wb_receive_orders_dbs');
  }
};
