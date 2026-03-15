/**
 * Инструмент для отправки сообщения в чат
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const sendChatMessageTool: ToolDefinition = {
  name: 'wb_send_chat_message',
  description: 'Отправить сообщение в чат с покупателем.',
  inputSchema: {
    type: 'object',
    properties: {
      chatId: {
        type: 'string',
        description: 'ID чата',
      },
      message: {
        type: 'string',
        description: 'Текст сообщения',
      },
    },
    required: ['chatId', 'message'],
  },
};

export const sendChatMessageHandler: ToolHandler = async (params) => {
  try {
    logger.info('Sending chat message', { chatId: params.chatId });
    const response = await wbFeedbackClient.post('/api/v1/seller/message', {
      chatId: params.chatId,
      message: params.message,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to send chat message', { error });
    return formatError(error, 'wb_send_chat_message');
  }
};
