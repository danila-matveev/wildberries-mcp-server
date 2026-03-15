/**
 * Инструмент для получения минус-фраз
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getMinusPhrasesTool: ToolDefinition = {
  name: 'wb_get_minus_phrases',
  description: 'Получить минус-фразы рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
      },
    },
    required: ['advertId'],
  },
};

export const getMinusPhrasesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting minus phrases', { advertId: params.advertId });
    const response = await wbAdvClient.post('/adv/v0/normquery/get-minus', {
      advertId: params.advertId,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get minus phrases', { error });
    return formatError(error, 'wb_get_minus_phrases');
  }
};
