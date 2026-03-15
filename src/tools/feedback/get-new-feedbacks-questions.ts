/**
 * Инструмент для получения новых отзывов и вопросов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getNewFeedbacksQuestionsTool: ToolDefinition = {
  name: 'wb_get_new_feedbacks_questions',
  description: 'Получить новые отзывы и вопросы. Возвращает количество неотвеченных отзывов и вопросов.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getNewFeedbacksQuestionsHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting new feedbacks and questions');
    const response = await wbFeedbackClient.get('/api/v1/new-feedbacks-questions');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get new feedbacks and questions', { error });
    return formatError(error, 'wb_get_new_feedbacks_questions');
  }
};
