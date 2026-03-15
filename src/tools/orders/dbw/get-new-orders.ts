/**
 * Инструмент для получения новых заказов DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getNewOrdersDbwTool: ToolDefinition = {
  name: 'wb_get_new_orders_dbw',
  description:
    'Получить список новых заказов DBW (Delivery by Wildberries — доставка силами Wildberries).',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getNewOrdersDbwHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting new DBW orders');

    const response = await wbMarketplaceClient.get('/api/v3/dbw/orders/new');

    logger.info('New DBW orders retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get new DBW orders', { error });
    return formatError(error, 'wb_get_new_orders_dbw');
  }
};
