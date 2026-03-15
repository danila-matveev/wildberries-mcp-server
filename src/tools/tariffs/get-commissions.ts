/**
 * Инструмент для получения тарифов комиссий
 */

import { wbClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getCommissionsTool: ToolDefinition = {
  name: 'wb_get_commission_tariffs',
  description: 'Получить тарифы комиссий Wildberries по категориям.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: {
        type: 'string',
        description: 'Локаль (например, ru)',
      },
    },
  },
};

export const getCommissionsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting commission tariffs', params);
    const response = await wbClient.get('/api/v1/tariffs/commission', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get commission tariffs', { error });
    return formatError(error, 'wb_get_commission_tariffs');
  }
};
