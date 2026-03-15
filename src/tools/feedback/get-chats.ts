/**
 * Инструмент для получения списка чатов
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getChatsTool: ToolDefinition = {
  name: 'wb_get_chats',
  description: 'Получить список чатов с покупателями.',
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

export const getChatsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting chats', params);
    const response = await wbFeedbackClient.get('/api/v1/seller/chats', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get chats', { error });
    return formatError(error, 'wb_get_chats');
  }
};
