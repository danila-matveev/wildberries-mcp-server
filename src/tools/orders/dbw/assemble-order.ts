/**
 * Инструмент для перевода заказа DBW в сборку
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const assembleOrderDbwTool: ToolDefinition = {
  name: 'wb_assemble_order_dbw',
  description:
    'Перевести заказ DBW в статус сборки. Указывает, что заказ начал собираться.',
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

export const assembleOrderDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderId } = params as { orderId: number };

    logger.info('Assembling DBW order', { orderId });

    const response = await wbMarketplaceClient.patch(
      `/api/v3/dbw/orders/${orderId}/assemble`
    );

    logger.info('DBW order assembly started successfully', { orderId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to assemble DBW order', { error });
    return formatError(error, 'wb_assemble_order_dbw');
  }
};
