/**
 * Инструмент для открепления отзывов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const unpinReviewsTool: ToolDefinition = {
  name: 'wb_unpin_reviews',
  description: 'Открепить отзывы по списку ID.',
  inputSchema: {
    type: 'object',
    properties: {
      feedbackIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Массив ID отзывов для открепления',
      },
    },
    required: ['feedbackIds'],
  },
};

export const unpinReviewsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Unpinning reviews', { feedbackIds: params.feedbackIds });
    const response = await wbFeedbackClient.delete('/api/feedbacks/v1/pins', {
      feedbackIds: params.feedbackIds,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to unpin reviews', { error });
    return formatError(error, 'wb_unpin_reviews');
  }
};
