/**
 * Инструмент для получения списка отзывов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getFeedbacksTool: ToolDefinition = {
  name: 'wb_get_feedbacks',
  description: 'Получить список отзывов. Поддерживает фильтрацию по статусу ответа, дате, артикулу и сортировку.',
  inputSchema: {
    type: 'object',
    properties: {
      isAnswered: {
        type: 'boolean',
        description: 'Фильтр: отвеченные (true) или неотвеченные (false)',
      },
      take: {
        type: 'number',
        description: 'Количество записей',
      },
      skip: {
        type: 'number',
        description: 'Смещение',
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
      order: {
        type: 'string',
        enum: ['dateAsc', 'dateDesc'],
        description: 'Сортировка по дате (dateAsc — по возрастанию, dateDesc — по убыванию)',
      },
    },
  },
};

export const getFeedbacksHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting feedbacks', params);
    const response = await wbFeedbackClient.get('/api/v1/feedbacks', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get feedbacks', { error });
    return formatError(error, 'wb_get_feedbacks');
  }
};
