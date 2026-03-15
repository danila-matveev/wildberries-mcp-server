/**
 * Инструмент для редактирования ответа на отзыв
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const editFeedbackAnswerTool: ToolDefinition = {
  name: 'wb_edit_feedback_answer',
  description: 'Редактировать ответ на отзыв покупателя.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID отзыва',
      },
      text: {
        type: 'string',
        description: 'Новый текст ответа',
      },
    },
    required: ['id', 'text'],
  },
};

export const editFeedbackAnswerHandler: ToolHandler = async (params) => {
  try {
    logger.info('Editing feedback answer', { id: params.id });
    const response = await wbFeedbackClient.patch('/api/v1/feedbacks/answer', {
      id: params.id,
      text: params.text,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to edit feedback answer', { error });
    return formatError(error, 'wb_edit_feedback_answer');
  }
};
