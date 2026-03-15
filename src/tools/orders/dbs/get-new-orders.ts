/**
 * Инструмент для получения новых заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getNewOrdersDbsTool: ToolDefinition = {
  name: 'wb_get_new_orders_dbs',
  description:
    'Получить список новых заказов DBS (Delivery by Seller — доставка силами продавца).',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getNewOrdersDbsHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting new DBS orders');

    const response = await wbMarketplaceClient.get('/api/v3/dbs/orders/new');

    logger.info('New DBS orders retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get new DBS orders', { error });
    return formatError(error, 'wb_get_new_orders_dbs');
  }
};
