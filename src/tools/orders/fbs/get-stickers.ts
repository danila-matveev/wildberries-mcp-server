/**
 * Инструмент для получения стикеров сборочных заданий FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getStickersTool: ToolDefinition = {
  name: 'wb_get_order_stickers',
  description:
    'Получить стикеры для сборочных заданий FBS. Стикеры необходимы для маркировки отправлений.',
  inputSchema: {
    type: 'object',
    properties: {
      orderIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив идентификаторов заказов',
      },
      type: {
        type: 'string',
        enum: ['svg', 'png'],
        description: 'Формат стикера (svg или png)',
      },
      width: {
        type: 'number',
        description: 'Ширина стикера в пикселях',
      },
      height: {
        type: 'number',
        description: 'Высота стикера в пикселях',
      },
    },
    required: ['orderIds'],
  },
};

export const getStickersHandler: ToolHandler = async (params) => {
  try {
    const { orderIds, type, width, height } = params as {
      orderIds: number[];
      type?: string;
      width?: number;
      height?: number;
    };

    logger.info('Getting FBS order stickers', { orderIds, type, width, height });

    const response = await wbMarketplaceClient.post('/api/v3/orders/stickers', {
      orders: orderIds,
      ...(type && { type }),
      ...(width && { width }),
      ...(height && { height }),
    });

    logger.info('FBS order stickers retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS order stickers', { error });
    return formatError(error, 'wb_get_order_stickers');
  }
};
