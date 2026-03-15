/**
 * Инструмент для получения стикеров заказов DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getStickersDbwTool: ToolDefinition = {
  name: 'wb_get_stickers_dbw',
  description:
    'Получить стикеры для заказов DBW. Стикеры необходимы для маркировки отправлений.',
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

export const getStickersDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBW stickers', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/dbw/orders/stickers',
      { orders: orderIds }
    );

    logger.info('DBW stickers retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBW stickers', { error });
    return formatError(error, 'wb_get_stickers_dbw');
  }
};
