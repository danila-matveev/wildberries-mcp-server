/**
 * Инструмент для получения закреплённых отзывов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getPinnedReviewsTool: ToolDefinition = {
  name: 'wb_get_pinned_reviews',
  description: 'Получить закреплённые отзывы для товара по артикулу.',
  inputSchema: {
    type: 'object',
    properties: {
      nmId: {
        type: 'number',
        description: 'Артикул WB (nmId) товара',
      },
    },
    required: ['nmId'],
  },
};

export const getPinnedReviewsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting pinned reviews', { nmId: params.nmId });
    const response = await wbFeedbackClient.get('/api/feedbacks/v1/pins', { nmId: params.nmId });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get pinned reviews', { error });
    return formatError(error, 'wb_get_pinned_reviews');
  }
};
