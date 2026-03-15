/**
 * Инструмент для паузы рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const pauseCampaignTool: ToolDefinition = {
  name: 'wb_pause_campaign',
  description: 'Поставить рекламную кампанию на паузу.',
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

export const pauseCampaignHandler: ToolHandler = async (params) => {
  try {
    logger.info('Pausing campaign', { id: params.id });
    const response = await wbAdvClient.get('/adv/v0/pause', { id: params.id });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to pause campaign', { error });
    return formatError(error, 'wb_pause_campaign');
  }
};
