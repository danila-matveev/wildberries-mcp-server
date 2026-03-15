/**
 * Инструмент для получения списка поставок FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getSuppliesTool: ToolDefinition = {
  name: 'wb_get_supplies',
  description:
    'Получить список поставок FBS с поддержкой пагинации.',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Количество поставок на странице (по умолчанию 100)',
        default: 100,
      },
      next: {
        type: 'number',
        description: 'Параметр пагинации — значение из предыдущего ответа',
      },
    },
  },
};

export const getSuppliesHandler: ToolHandler = async (params) => {
  try {
    const { limit, next } = params as { limit?: number; next?: number };

    logger.info('Getting FBS supplies', { limit, next });

    const response = await wbMarketplaceClient.get('/api/v3/supplies', {
      limit: limit || 100,
      ...(next !== undefined && { next }),
    });

    logger.info('FBS supplies retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS supplies', { error });
    return formatError(error, 'wb_get_supplies');
  }
};
