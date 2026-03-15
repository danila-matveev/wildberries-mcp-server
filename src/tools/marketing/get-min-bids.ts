/**
 * Инструмент для получения минимальных ставок
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getMinBidsTool: ToolDefinition = {
  name: 'wb_get_min_bids',
  description: 'Получить минимальные ставки для рекламных кампаний.',
  inputSchema: {
    type: 'object',
    properties: {
      type: {
        type: 'number',
        description: 'Тип кампании',
      },
      nmIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив артикулов WB',
      },
    },
    required: ['type', 'nmIds'],
  },
};

export const getMinBidsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting min bids', { type: params.type });
    const response = await wbAdvClient.post('/api/advert/v1/bids/min', {
      type: params.type,
      nmIds: params.nmIds,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get min bids', { error });
    return formatError(error, 'wb_get_min_bids');
  }
};
