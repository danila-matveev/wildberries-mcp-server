/**
 * Инструмент для удаления ставок по поисковым запросам
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const deleteSearchBidsTool: ToolDefinition = {
  name: 'wb_delete_search_bids',
  description: 'Удалить ставки по поисковым запросам для рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
      },
      queries: {
        type: 'array',
        items: { type: 'string' },
        description: 'Массив поисковых запросов для удаления',
      },
    },
    required: ['advertId', 'queries'],
  },
};

export const deleteSearchBidsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Deleting search bids', { advertId: params.advertId });
    const response = await wbAdvClient.delete('/adv/v0/normquery/bids', {
      advertId: params.advertId,
      queries: params.queries,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to delete search bids', { error });
    return formatError(error, 'wb_delete_search_bids');
  }
};
