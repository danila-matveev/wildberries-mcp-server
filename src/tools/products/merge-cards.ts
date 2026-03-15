/**
 * Инструмент для объединения карточек товаров
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const mergeCardsTool: ToolDefinition = {
  name: 'wb_merge_cards',
  description: 'Объединить карточки товаров. Перемещает номенклатуры в целевую карточку.',
  inputSchema: {
    type: 'object',
    properties: {
      targetNmID: { type: 'number', description: 'ID целевой номенклатуры (куда объединять)' },
      nmIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив ID номенклатур для объединения',
      },
    },
    required: ['targetNmID', 'nmIDs'],
  },
};

export const mergeCardsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Merging cards', params);
    const { targetNmID, nmIDs } = params as { targetNmID: number; nmIDs: number[] };
    const response = await wbContentClient.post('/content/v2/cards/moveNm', { targetNmID, nmIDs });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to merge cards', { error });
    return formatError(error, 'wb_merge_cards');
  }
};
