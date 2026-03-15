/**
 * Инструмент для установки ставок по поисковым запросам
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const setSearchBidsTool: ToolDefinition = {
  name: 'wb_set_search_bids',
  description: 'Установить ставки по поисковым запросам для рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
      },
      bids: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Поисковый запрос' },
            cpm: { type: 'number', description: 'Ставка CPM' },
          },
          required: ['query', 'cpm'],
        },
        description: 'Массив ставок по запросам',
      },
    },
    required: ['advertId', 'bids'],
  },
};

export const setSearchBidsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Setting search bids', { advertId: params.advertId });
    const response = await wbAdvClient.post('/adv/v0/normquery/bids', {
      advertId: params.advertId,
      bids: params.bids,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to set search bids', { error });
    return formatError(error, 'wb_set_search_bids');
  }
};
