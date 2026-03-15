/**
 * Инструмент для получения коробок поставки FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getSupplyBoxesTool: ToolDefinition = {
  name: 'wb_get_supply_boxes',
  description:
    'Получить список коробок (транспортных мест) поставки FBS.',
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

export const getSupplyBoxesHandler: ToolHandler = async (params) => {
  try {
    const { supplyId } = params as { supplyId: string };

    logger.info('Getting FBS supply boxes', { supplyId });

    const response = await wbMarketplaceClient.get(
      `/api/v3/supplies/${supplyId}/trbx`
    );

    logger.info('FBS supply boxes retrieved successfully', { supplyId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS supply boxes', { error });
    return formatError(error, 'wb_get_supply_boxes');
  }
};
