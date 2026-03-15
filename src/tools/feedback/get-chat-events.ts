/**
 * Инструмент для получения событий чата
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getChatEventsTool: ToolDefinition = {
  name: 'wb_get_chat_events',
  description: 'Получить события (сообщения) конкретного чата.',
  inputSchema: {
    type: 'object',
    properties: {
      chatId: {
        type: 'string',
        description: 'ID чата',
      },
    },
    required: ['chatId'],
  },
};

export const getChatEventsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting chat events', { chatId: params.chatId });
    const response = await wbFeedbackClient.get('/api/v1/seller/events', { chatId: params.chatId });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get chat events', { error });
    return formatError(error, 'wb_get_chat_events');
  }
};
