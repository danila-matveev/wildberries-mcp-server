/**
 * Инструмент для получения баланса аккаунта
 */

import { wbDocumentsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getBalanceTool: ToolDefinition = {
  name: 'wb_get_account_balance',
  description: 'Получить баланс аккаунта продавца на Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getBalanceHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting account balance');
    const response = await wbDocumentsClient.get('/api/v1/account/balance');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get account balance', { error });
    return formatError(error, 'wb_get_account_balance');
  }
};
