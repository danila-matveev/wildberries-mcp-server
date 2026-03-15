/**
 * Инструмент для получения количества неотвеченных отзывов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getFeedbacksCountTool: ToolDefinition = {
  name: 'wb_get_feedbacks_count',
  description: 'Получить количество неотвеченных отзывов за период.',
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

export const getFeedbacksCountHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting feedbacks count', params);
    const response = await wbFeedbackClient.get('/api/v1/feedbacks/count-unanswered', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get feedbacks count', { error });
    return formatError(error, 'wb_get_feedbacks_count');
  }
};
