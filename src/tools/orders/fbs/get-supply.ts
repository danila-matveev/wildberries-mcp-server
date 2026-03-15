/**
 * Инструмент для получения информации о поставке FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getSupplyTool: ToolDefinition = {
  name: 'wb_get_supply',
  description:
    'Получить подробную информацию о конкретной поставке FBS по её идентификатору.',
  inputSchema: {
    type: 'object',
    properties: {
      supplyId: {
        type: 'string',
        description: 'Идентификатор поставки (например, WB-GI-1234567)',
      },
    },
    required: ['supplyId'],
  },
};

export const getSupplyHandler: ToolHandler = async (params) => {
  try {
    const { supplyId } = params as { supplyId: string };

    logger.info('Getting FBS supply', { supplyId });

    const response = await wbMarketplaceClient.get(
      `/api/v3/supplies/${supplyId}`
    );

    logger.info('FBS supply retrieved successfully', { supplyId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS supply', { error });
    return formatError(error, 'wb_get_supply');
  }
};
