/**
 * Инструмент для получения стикеров кроссбордер заказов FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getCrossborderStickersTool: ToolDefinition = {
  name: 'wb_get_crossborder_stickers',
  description:
    'Получить стикеры для кроссбордер заказов FBS. Используется для международных отправлений.',
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

export const getCrossborderStickersHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting crossborder stickers', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/orders/stickers/cross-border',
      { orders: orderIds }
    );

    logger.info('Crossborder stickers retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get crossborder stickers', { error });
    return formatError(error, 'wb_get_crossborder_stickers');
  }
};
