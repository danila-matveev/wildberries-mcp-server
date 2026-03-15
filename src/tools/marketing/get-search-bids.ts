/**
 * Инструмент для получения ставок по поисковым запросам
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getSearchBidsTool: ToolDefinition = {
  name: 'wb_get_search_bids',
  description: 'Получить ставки по поисковым запросам для рекламной кампании.',
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

export const getSearchBidsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting search bids', { advertId: params.advertId });
    const response = await wbAdvClient.post('/adv/v0/normquery/get-bids', {
      advertId: params.advertId,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get search bids', { error });
    return formatError(error, 'wb_get_search_bids');
  }
};
