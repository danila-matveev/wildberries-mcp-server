/**
 * Инструмент для получения бюджета рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getAdBudgetTool: ToolDefinition = {
  name: 'wb_get_ad_budget',
  description: 'Получить бюджет конкретной рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'ID кампании',
      },
    },
    required: ['id'],
  },
};

export const getAdBudgetHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting ad budget', { id: params.id });
    const response = await wbAdvClient.get('/adv/v1/budget', { id: params.id });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get ad budget', { error });
    return formatError(error, 'wb_get_ad_budget');
  }
};
