/**
 * Инструмент для получения архивных отзывов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getArchivedFeedbacksTool: ToolDefinition = {
  name: 'wb_get_archived_feedbacks',
  description: 'Получить архивные отзывы.',
  inputSchema: {
    type: 'object',
    properties: {
      take: {
        type: 'number',
        description: 'Количество записей',
      },
      skip: {
        type: 'number',
        description: 'Смещение',
      },
    },
  },
};

export const getArchivedFeedbacksHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting archived feedbacks', params);
    const response = await wbFeedbackClient.get('/api/v1/feedbacks/archive', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get archived feedbacks', { error });
    return formatError(error, 'wb_get_archived_feedbacks');
  }
};
