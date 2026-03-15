/**
 * Инструмент для запуска рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const startCampaignTool: ToolDefinition = {
  name: 'wb_start_campaign',
  description: 'Запустить рекламную кампанию.',
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

export const startCampaignHandler: ToolHandler = async (params) => {
  try {
    logger.info('Starting campaign', { id: params.id });
    const response = await wbAdvClient.get('/adv/v0/start', { id: params.id });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to start campaign', { error });
    return formatError(error, 'wb_start_campaign');
  }
};
