/**
 * Инструмент для получения даты доставки заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getDeliveryDateDbsTool: ToolDefinition = {
  name: 'wb_get_delivery_date_dbs',
  description:
    'Получить даты доставки для заказов DBS по списку идентификаторов.',
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

export const getDeliveryDateDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBS delivery dates', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/dbs/orders/delivery-date',
      { orders: orderIds }
    );

    logger.info('DBS delivery dates retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBS delivery dates', { error });
    return formatError(error, 'wb_get_delivery_date_dbs');
  }
};
