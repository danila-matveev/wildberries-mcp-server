/**
 * Инструмент для получения одного отзыва по ID
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getFeedbackTool: ToolDefinition = {
  name: 'wb_get_feedback',
  description: 'Получить отзыв по его ID.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID отзыва',
      },
    },
    required: ['id'],
  },
};

export const getFeedbackHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting feedback', { id: params.id });
    const response = await wbFeedbackClient.get('/api/v1/feedback', { id: params.id });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get feedback', { error });
    return formatError(error, 'wb_get_feedback');
  }
};
