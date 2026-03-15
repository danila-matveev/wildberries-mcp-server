/**
 * Инструмент для закрепления отзывов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const pinReviewsTool: ToolDefinition = {
  name: 'wb_pin_reviews',
  description: 'Закрепить отзывы по списку ID.',
  inputSchema: {
    type: 'object',
    properties: {
      feedbackIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Массив ID отзывов для закрепления',
      },
    },
    required: ['feedbackIds'],
  },
};

export const pinReviewsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Pinning reviews', { feedbackIds: params.feedbackIds });
    const response = await wbFeedbackClient.post('/api/feedbacks/v1/pins', {
      feedbackIds: params.feedbackIds,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to pin reviews', { error });
    return formatError(error, 'wb_pin_reviews');
  }
};
