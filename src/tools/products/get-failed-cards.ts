/**
 * Инструмент для получения списка карточек с ошибками
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getFailedCardsTool: ToolDefinition = {
  name: 'wb_get_failed_cards',
  description: 'Получить список карточек товаров с ошибками.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: { type: 'string', description: 'Локаль (ru, en, etc.)', default: 'ru' },
    },
  },
};

export const getFailedCardsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting failed cards', params);
    const response = await wbContentClient.post('/content/v2/cards/error/list', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get failed cards', { error });
    return formatError(error, 'wb_get_failed_cards');
  }
};
