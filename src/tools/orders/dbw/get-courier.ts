/**
 * Инструмент для получения информации о курьере заказов DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getCourierDbwTool: ToolDefinition = {
  name: 'wb_get_courier_dbw',
  description:
    'Получить информацию о курьере для заказов DBW (данные курьера, время доставки).',
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

export const getCourierDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBW courier info', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/dbw/orders/courier',
      { orders: orderIds }
    );

    logger.info('DBW courier info retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBW courier info', { error });
    return formatError(error, 'wb_get_courier_dbw');
  }
};
