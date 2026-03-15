/**
 * Инструмент для отмены заказа DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const cancelOrderDbwTool: ToolDefinition = {
  name: 'wb_cancel_order_dbw',
  description:
    'Отменить заказ DBW. Отмена возможна только для заказов в определённых статусах.',
  inputSchema: {
    type: 'object',
    properties: {
      orderId: {
        type: 'number',
        description: 'Идентификатор заказа для отмены',
      },
    },
    required: ['orderId'],
  },
};

export const cancelOrderDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderId } = params as { orderId: number };

    logger.info('Cancelling DBW order', { orderId });

    const response = await wbMarketplaceClient.patch(
      `/api/v3/dbw/orders/${orderId}/cancel`
    );

    logger.info('DBW order cancelled successfully', { orderId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to cancel DBW order', { error });
    return formatError(error, 'wb_cancel_order_dbw');
  }
};
