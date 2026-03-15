/**
 * Инструмент для получения списка вопросов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getQuestionsTool: ToolDefinition = {
  name: 'wb_get_questions',
  description: 'Получить список вопросов покупателей. Поддерживает фильтрацию по статусу ответа, дате и артикулу.',
  inputSchema: {
    type: 'object',
    properties: {
      isAnswered: {
        type: 'boolean',
        description: 'Фильтр: отвеченные (true) или неотвеченные (false)',
      },
      take: {
        type: 'number',
        description: 'Количество записей (по умолчанию 100)',
      },
      skip: {
        type: 'number',
        description: 'Смещение (по умолчанию 0)',
      },
      dateFrom: {
        type: 'string',
        description: 'Дата начала периода (ISO 8601)',
      },
      dateTo: {
        type: 'string',
        description: 'Дата окончания периода (ISO 8601)',
      },
      nmId: {
        type: 'number',
        description: 'Артикул WB для фильтрации',
      },
    },
  },
};

export const getQuestionsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting questions', params);
    const response = await wbFeedbackClient.get('/api/v1/questions', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get questions', { error });
    return formatError(error, 'wb_get_questions');
  }
};
