/**
 * Инструмент для получения списка заказов DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getOrdersDbwTool: ToolDefinition = {
  name: 'wb_get_orders_dbw',
  description:
    'Получить список заказов DBW (Delivery by Wildberries) с пагинацией.',
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

export const getOrdersDbwHandler: ToolHandler = async (params) => {
  try {
    const { limit, next } = params as { limit?: number; next?: number };

    logger.info('Getting DBW orders', { limit, next });

    const response = await wbMarketplaceClient.get('/api/v3/dbw/orders', {
      ...(limit && { limit }),
      ...(next !== undefined && { next }),
    });

    logger.info('DBW orders retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBW orders', { error });
    return formatError(error, 'wb_get_orders_dbw');
  }
};
