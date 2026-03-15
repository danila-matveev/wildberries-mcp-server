/**
 * Инструмент для получения пропусков FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getPassesTool: ToolDefinition = {
  name: 'wb_get_passes',
  description:
    'Получить список пропусков для доставки поставок на склады Wildberries. ' +
    'Также доступен эндпоинт GET /api/v3/passes/offices для получения списка офисов/складов.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getPassesHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting FBS passes');

    const response = await wbMarketplaceClient.get('/api/v3/passes');

    logger.info('FBS passes retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS passes', { error });
    return formatError(error, 'wb_get_passes');
  }
};
