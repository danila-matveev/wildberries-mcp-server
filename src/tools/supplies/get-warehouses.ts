/**
 * Инструмент для получения списка складов
 */

import { wbMarketplaceClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getWarehousesTool: ToolDefinition = {
  name: 'wb_get_warehouses',
  description: 'Получить список складов Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getWarehousesHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting warehouses');
    const response = await wbMarketplaceClient.get('/api/v1/warehouses');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get warehouses', { error });
    return formatError(error, 'wb_get_warehouses');
  }
};
