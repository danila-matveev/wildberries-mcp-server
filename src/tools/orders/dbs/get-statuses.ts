/**
 * Инструмент для получения статусов заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getStatusesDbsTool: ToolDefinition = {
  name: 'wb_get_statuses_dbs',
  description:
    'Получить статусы заказов DBS по списку идентификаторов.',
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

export const getStatusesDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBS orders statuses', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/dbs/orders/status/info',
      { orders: orderIds }
    );

    logger.info('DBS orders statuses retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBS orders statuses', { error });
    return formatError(error, 'wb_get_statuses_dbs');
  }
};
