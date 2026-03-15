/**
 * Инструмент для получения списка поставок FBW
 */

import { wbMarketplaceClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getFbwSuppliesTool: ToolDefinition = {
  name: 'wb_get_fbw_supplies',
  description: 'Получить список поставок FBW (Fulfillment by Wildberries).',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Количество записей',
      },
      next: {
        type: 'number',
        description: 'Курсор для пагинации',
      },
    },
  },
};

export const getFbwSuppliesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting FBW supplies', params);
    const response = await wbMarketplaceClient.post('/api/v1/supplies', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBW supplies', { error });
    return formatError(error, 'wb_get_fbw_supplies');
  }
};
