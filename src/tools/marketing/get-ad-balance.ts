/**
 * Инструмент для получения баланса рекламного кабинета
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getAdBalanceTool: ToolDefinition = {
  name: 'wb_get_ad_balance',
  description: 'Получить баланс рекламного кабинета.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getAdBalanceHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting ad balance');
    const response = await wbAdvClient.get('/adv/v1/balance');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get ad balance', { error });
    return formatError(error, 'wb_get_ad_balance');
  }
};
