/**
 * Инструмент для установки минус-фраз
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const setMinusPhrasesTool: ToolDefinition = {
  name: 'wb_set_minus_phrases',
  description: 'Установить минус-фразы для рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
      },
      phrases: {
        type: 'array',
        items: { type: 'string' },
        description: 'Массив минус-фраз',
      },
    },
    required: ['advertId', 'phrases'],
  },
};

export const setMinusPhrasesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Setting minus phrases', { advertId: params.advertId });
    const response = await wbAdvClient.post('/adv/v0/normquery/set-minus', {
      advertId: params.advertId,
      phrases: params.phrases,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to set minus phrases', { error });
    return formatError(error, 'wb_set_minus_phrases');
  }
};
