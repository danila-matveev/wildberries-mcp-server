/**
 * Инструмент для получения количества рекламных кампаний
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getCampaignsCountTool: ToolDefinition = {
  name: 'wb_get_campaigns_count',
  description: 'Получить количество рекламных кампаний по статусам.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getCampaignsCountHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting campaigns count');
    const response = await wbAdvClient.get('/adv/v1/promotion/count');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get campaigns count', { error });
    return formatError(error, 'wb_get_campaigns_count');
  }
};
