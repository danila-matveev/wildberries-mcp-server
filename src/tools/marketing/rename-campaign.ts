/**
 * Инструмент для переименования рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const renameCampaignTool: ToolDefinition = {
  name: 'wb_rename_campaign',
  description: 'Переименовать рекламную кампанию.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
      },
      name: {
        type: 'string',
        description: 'Новое название кампании',
      },
    },
    required: ['advertId', 'name'],
  },
};

export const renameCampaignHandler: ToolHandler = async (params) => {
  try {
    logger.info('Renaming campaign', { advertId: params.advertId, name: params.name });
    const response = await wbAdvClient.post('/adv/v0/rename', {
      advertId: params.advertId,
      name: params.name,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to rename campaign', { error });
    return formatError(error, 'wb_rename_campaign');
  }
};
