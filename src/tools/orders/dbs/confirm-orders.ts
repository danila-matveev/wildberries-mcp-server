/**
 * Инструмент для подтверждения заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const confirmOrdersDbsTool: ToolDefinition = {
  name: 'wb_confirm_orders_dbs',
  description:
    'Подтвердить заказы DBS. Переводит указанные заказы в статус подтверждённых.',
  inputSchema: {
    type: 'object',
    properties: {
      orderIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив идентификаторов заказов для подтверждения',
      },
    },
    required: ['orderIds'],
  },
};

export const confirmOrdersDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Confirming DBS orders', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/dbs/orders/status/confirm',
      { orders: orderIds }
    );

    logger.info('DBS orders confirmed successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to confirm DBS orders', { error });
    return formatError(error, 'wb_confirm_orders_dbs');
  }
};
