/**
 * Инструмент для возврата заказа по отзыву
 */

import { wbFeedbackClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const returnFeedbackOrderTool: ToolDefinition = {
  name: 'wb_return_feedback_order',
  description: 'Инициировать возврат заказа по отзыву.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID отзыва',
      },
    },
    required: ['id'],
  },
};

export const returnFeedbackOrderHandler: ToolHandler = async (params) => {
  try {
    logger.info('Returning feedback order', { id: params.id });
    const response = await wbFeedbackClient.post('/api/v1/feedbacks/order/return', {
      id: params.id,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to return feedback order', { error });
    return formatError(error, 'wb_return_feedback_order');
  }
};
