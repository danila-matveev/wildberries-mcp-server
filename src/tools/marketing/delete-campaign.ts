/**
 * Инструмент для удаления рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const deleteCampaignTool: ToolDefinition = {
  name: 'wb_delete_campaign',
  description: 'Удалить рекламную кампанию.',
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

export const deleteCampaignHandler: ToolHandler = async (params) => {
  try {
    logger.info('Deleting campaign', { id: params.id });
    const response = await wbAdvClient.get('/adv/v0/delete', { id: params.id });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to delete campaign', { error });
    return formatError(error, 'wb_delete_campaign');
  }
};
