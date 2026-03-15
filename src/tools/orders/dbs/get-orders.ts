/**
 * Инструмент для получения списка заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getOrdersDbsTool: ToolDefinition = {
  name: 'wb_get_orders_dbs',
  description:
    'Получить список заказов DBS (Delivery by Seller) с пагинацией.',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Количество заказов на странице',
      },
      next: {
        type: 'number',
        description: 'Параметр пагинации — значение из предыдущего ответа',
      },
    },
  },
};

export const getOrdersDbsHandler: ToolHandler = async (params) => {
  try {
    const { limit, next } = params as { limit?: number; next?: number };

    logger.info('Getting DBS orders', { limit, next });

    const response = await wbMarketplaceClient.get('/api/v3/dbs/orders', {
      ...(limit && { limit }),
      ...(next !== undefined && { next }),
    });

    logger.info('DBS orders retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBS orders', { error });
    return formatError(error, 'wb_get_orders_dbs');
  }
};
