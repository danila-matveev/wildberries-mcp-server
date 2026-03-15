/**
 * Инструмент для подтверждения заказа DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const confirmOrderDbwTool: ToolDefinition = {
  name: 'wb_confirm_order_dbw',
  description:
    'Подтвердить заказ DBW. Переводит заказ в статус подтверждённого.',
  inputSchema: {
    type: 'object',
    properties: {
      orderId: {
        type: 'number',
        description: 'Идентификатор заказа',
      },
    },
    required: ['orderId'],
  },
};

export const confirmOrderDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderId } = params as { orderId: number };

    logger.info('Confirming DBW order', { orderId });

    const response = await wbMarketplaceClient.patch(
      `/api/v3/dbw/orders/${orderId}/confirm`
    );

    logger.info('DBW order confirmed successfully', { orderId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to confirm DBW order', { error });
    return formatError(error, 'wb_confirm_order_dbw');
  }
};
