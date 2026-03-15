/**
 * Инструмент для восстановления карточек товаров
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const recoverCardsTool: ToolDefinition = {
  name: 'wb_recover_cards',
  description: 'Восстановить удалённые карточки товаров из корзины.',
  inputSchema: {
    type: 'object',
    properties: {
      nmIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив ID номенклатур для восстановления',
      },
    },
    required: ['nmIDs'],
  },
};

export const recoverCardsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Recovering cards', params);
    const { nmIDs } = params as { nmIDs: number[] };
    const response = await wbContentClient.post('/content/v2/cards/recover', { nmIDs });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to recover cards', { error });
    return formatError(error, 'wb_recover_cards');
  }
};
