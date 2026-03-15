/**
 * Инструмент для получения упаковки поставки FBW
 */

import { wbMarketplaceClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getFbwSupplyPackageTool: ToolDefinition = {
  name: 'wb_get_fbw_supply_package',
  description: 'Получить информацию об упаковке поставки FBW.',
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

export const getFbwSupplyPackageHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting FBW supply package', { id: params.id });
    const response = await wbMarketplaceClient.get(`/api/v1/supplies/${params.id}/package`);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBW supply package', { error });
    return formatError(error, 'wb_get_fbw_supply_package');
  }
};
