/**
 * Инструмент для остановки рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const stopCampaignTool: ToolDefinition = {
  name: 'wb_stop_campaign',
  description: 'Остановить рекламную кампанию.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'ID кампании',
      },
    },
    required: ['id'],
  },
};

export const stopCampaignHandler: ToolHandler = async (params) => {
  try {
    logger.info('Stopping campaign', { id: params.id });
    const response = await wbAdvClient.get('/adv/v0/stop', { id: params.id });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to stop campaign', { error });
    return formatError(error, 'wb_stop_campaign');
  }
};
