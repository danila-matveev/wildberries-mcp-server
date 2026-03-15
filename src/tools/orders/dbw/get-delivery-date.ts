/**
 * Инструмент для получения даты доставки заказов DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getDeliveryDateDbwTool: ToolDefinition = {
  name: 'wb_get_delivery_date_dbw',
  description:
    'Получить даты доставки для заказов DBW по списку идентификаторов.',
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

export const getDeliveryDateDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBW delivery dates', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/dbw/orders/delivery-date',
      { orders: orderIds }
    );

    logger.info('DBW delivery dates retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBW delivery dates', { error });
    return formatError(error, 'wb_get_delivery_date_dbw');
  }
};
