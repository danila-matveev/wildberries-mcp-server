/**
 * Инструмент для получения рекомендаций по ставкам
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getBidRecommendationsTool: ToolDefinition = {
  name: 'wb_get_bid_recommendations',
  description: 'Получить рекомендации по ставкам для рекламной кампании.',
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

export const getBidRecommendationsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting bid recommendations', { advertId: params.advertId });
    const response = await wbAdvClient.get('/api/advert/v0/bids/recommendations', { advertId: params.advertId });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get bid recommendations', { error });
    return formatError(error, 'wb_get_bid_recommendations');
  }
};
