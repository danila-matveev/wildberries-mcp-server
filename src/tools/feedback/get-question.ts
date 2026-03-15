/**
 * Инструмент для получения одного вопроса по ID
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getQuestionTool: ToolDefinition = {
  name: 'wb_get_question',
  description: 'Получить вопрос по его ID.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID вопроса',
      },
    },
    required: ['id'],
  },
};

export const getQuestionHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting question', { id: params.id });
    const response = await wbFeedbackClient.get('/api/v1/question', { id: params.id });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get question', { error });
    return formatError(error, 'wb_get_question');
  }
};
