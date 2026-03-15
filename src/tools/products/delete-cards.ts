/**
 * Инструмент для удаления карточек товаров
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const deleteCardsTool: ToolDefinition = {
  name: 'wb_delete_cards',
  description: 'Удалить карточки товаров (перемещение в корзину).',
  inputSchema: {
    type: 'object',
    properties: {
      nmIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив ID номенклатур для удаления',
      },
    },
    required: ['nmIDs'],
  },
};

export const deleteCardsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Deleting cards', params);
    const { nmIDs } = params as { nmIDs: number[] };
    const response = await wbContentClient.post('/content/v2/cards/delete/trash', { nmIDs });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to delete cards', { error });
    return formatError(error, 'wb_delete_cards');
  }
};
