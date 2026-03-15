/**
 * Инструмент для получения информации о поставке FBW
 */

import { wbMarketplaceClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getFbwSupplyTool: ToolDefinition = {
  name: 'wb_get_fbw_supply',
  description: 'Получить информацию о конкретной поставке FBW.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID поставки',
      },
    },
    required: ['id'],
  },
};

export const getFbwSupplyHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting FBW supply', { id: params.id });
    const response = await wbMarketplaceClient.get(`/api/v1/supplies/${params.id}`);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBW supply', { error });
    return formatError(error, 'wb_get_fbw_supply');
  }
};
