/**
 * Инструмент для ответа на вопрос покупателя
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const answerQuestionTool: ToolDefinition = {
  name: 'wb_answer_question',
  description: 'Ответить на вопрос покупателя. Требуется указать ID вопроса, текст ответа и состояние.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID вопроса',
      },
      answer: {
        type: 'string',
        description: 'Текст ответа на вопрос',
      },
      state: {
        type: 'string',
        enum: ['wbRu', 'none'],
        description: 'Состояние вопроса (wbRu или none)',
      },
    },
    required: ['id', 'answer', 'state'],
  },
};

export const answerQuestionHandler: ToolHandler = async (params) => {
  try {
    logger.info('Answering question', { id: params.id });
    const response = await wbFeedbackClient.patch('/api/v1/questions', {
      id: params.id,
      answer: params.answer,
      state: params.state,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to answer question', { error });
    return formatError(error, 'wb_answer_question');
  }
};
