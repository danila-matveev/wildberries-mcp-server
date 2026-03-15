/**
 * Инструмент для ответа на отзыв
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const answerFeedbackTool: ToolDefinition = {
  name: 'wb_answer_feedback',
  description: 'Ответить на отзыв покупателя.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID отзыва',
      },
      text: {
        type: 'string',
        description: 'Текст ответа на отзыв',
      },
    },
    required: ['id', 'text'],
  },
};

export const answerFeedbackHandler: ToolHandler = async (params) => {
  try {
    logger.info('Answering feedback', { id: params.id });
    const response = await wbFeedbackClient.post('/api/v1/feedbacks/answer', {
      id: params.id,
      text: params.text,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to answer feedback', { error });
    return formatError(error, 'wb_answer_feedback');
  }
};
