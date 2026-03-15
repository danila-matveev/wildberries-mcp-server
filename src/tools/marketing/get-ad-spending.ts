/**
 * Инструмент для получения расходов на рекламу
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getAdSpendingTool: ToolDefinition = {
  name: 'wb_get_ad_spending',
  description: 'Получить расходы на рекламу за период.',
  inputSchema: {
    type: 'object',
    properties: {
      from: {
        type: 'string',
        description: 'Дата начала периода (YYYY-MM-DD)',
      },
      to: {
        type: 'string',
        description: 'Дата окончания периода (YYYY-MM-DD)',
      },
    },
  },
};

export const getAdSpendingHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting ad spending', params);
    const response = await wbAdvClient.get('/adv/v1/upd', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get ad spending', { error });
    return formatError(error, 'wb_get_ad_spending');
  }
};
