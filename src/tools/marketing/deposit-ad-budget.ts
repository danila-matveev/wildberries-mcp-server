/**
 * Инструмент для пополнения бюджета рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const depositAdBudgetTool: ToolDefinition = {
  name: 'wb_deposit_ad_budget',
  description: 'Пополнить бюджет рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'ID кампании',
      },
      sum: {
        type: 'number',
        description: 'Сумма пополнения',
      },
    },
    required: ['id', 'sum'],
  },
};

export const depositAdBudgetHandler: ToolHandler = async (params) => {
  try {
    logger.info('Depositing ad budget', { id: params.id, sum: params.sum });
    const response = await wbAdvClient.post('/adv/v1/budget/deposit', {
      id: params.id,
      sum: params.sum,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to deposit ad budget', { error });
    return formatError(error, 'wb_deposit_ad_budget');
  }
};
