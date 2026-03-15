/**
 * Инструмент для получения товаров в поставке FBW
 */

import { wbMarketplaceClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getFbwSupplyGoodsTool: ToolDefinition = {
  name: 'wb_get_fbw_supply_goods',
  description: 'Получить список товаров в конкретной поставке FBW.',
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

export const getFbwSupplyGoodsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting FBW supply goods', { id: params.id });
    const response = await wbMarketplaceClient.get(`/api/v1/supplies/${params.id}/goods`);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBW supply goods', { error });
    return formatError(error, 'wb_get_fbw_supply_goods');
  }
};
