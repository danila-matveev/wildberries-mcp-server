/**
 * Инструмент для отмены сборочного задания FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const cancelOrderTool: ToolDefinition = {
  name: 'wb_cancel_order_fbs',
  description:
    'Отменить сборочное задание FBS. Отмена возможна только для заказов в определённых статусах.',
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

export const cancelOrderHandler: ToolHandler = async (params) => {
  try {
    const { orderId } = params as { orderId: number };

    logger.info('Cancelling FBS order', { orderId });

    const response = await wbMarketplaceClient.patch(
      `/api/v3/orders/${orderId}/cancel`
    );

    logger.info('FBS order cancelled successfully', { orderId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to cancel FBS order', { error });
    return formatError(error, 'wb_cancel_order_fbs');
  }
};
