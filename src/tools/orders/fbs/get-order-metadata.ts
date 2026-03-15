/**
 * Инструмент для получения метаданных заказов FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getOrderMetadataTool: ToolDefinition = {
  name: 'wb_get_order_metadata',
  description:
    'Получить метаданные (КиЗ, УИН, IMEI и др.) для сборочных заданий FBS по списку идентификаторов.',
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

export const getOrderMetadataHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting FBS order metadata', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/orders/meta',
      { orders: orderIds }
    );

    logger.info('FBS order metadata retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS order metadata', { error });
    return formatError(error, 'wb_get_order_metadata');
  }
};
