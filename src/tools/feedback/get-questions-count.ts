/**
 * Инструмент для получения количества вопросов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getQuestionsCountTool: ToolDefinition = {
  name: 'wb_get_questions_count',
  description: 'Получить количество неотвеченных вопросов. Также позволяет получить общее количество вопросов за период.',
  inputSchema: {
    type: 'object',
    properties: {
      dateFrom: {
        type: 'string',
        description: 'Дата начала периода (ISO 8601)',
      },
      dateTo: {
        type: 'string',
        description: 'Дата окончания периода (ISO 8601)',
      },
    },
  },
};

export const getQuestionsCountHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting questions count', params);
    const response = await wbFeedbackClient.get('/api/v1/questions/count-unanswered', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get questions count', { error });
    return formatError(error, 'wb_get_questions_count');
  }
};
