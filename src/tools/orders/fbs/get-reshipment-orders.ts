/**
 * Инструмент для получения повторных отправлений FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getReshipmentOrdersTool: ToolDefinition = {
  name: 'wb_get_reshipment_orders',
  description:
    'Получить список заказов на повторную отправку (реотгрузку) FBS. ' +
    'Возвращает заказы, которые требуют повторной сборки и отправки.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getReshipmentOrdersHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting FBS reshipment orders');

    const response = await wbMarketplaceClient.get(
      '/api/v3/supplies/orders/reshipment'
    );

    logger.info('FBS reshipment orders retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS reshipment orders', { error });
    return formatError(error, 'wb_get_reshipment_orders');
  }
};
