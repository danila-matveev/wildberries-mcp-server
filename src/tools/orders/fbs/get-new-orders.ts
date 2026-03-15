/**
 * Инструмент для получения новых сборочных заданий FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getNewOrdersTool: ToolDefinition = {
  name: 'wb_get_new_orders_fbs',
  description:
    'Получить список новых сборочных заданий FBS (Fulfillment by Seller). ' +
    'Возвращает все заказы со статусом "new", которые необходимо обработать.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getNewOrdersHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting new FBS orders');

    const response = await wbMarketplaceClient.get('/api/v3/orders/new');

    logger.info('New FBS orders retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get new FBS orders', { error });
    return formatError(error, 'wb_get_new_orders_fbs');
  }
};
