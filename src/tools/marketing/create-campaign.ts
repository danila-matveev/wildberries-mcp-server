/**
 * Инструмент для создания рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const createCampaignTool: ToolDefinition = {
  name: 'wb_create_campaign',
  description: 'Создать новую рекламную кампанию.',
  inputSchema: {
    type: 'object',
    properties: {
      type: {
        type: 'number',
        description: 'Тип кампании',
      },
      name: {
        type: 'string',
        description: 'Название кампании',
      },
      subjectId: {
        type: 'number',
        description: 'ID предмета (категории)',
      },
      nmIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив артикулов WB для рекламы',
      },
    },
    required: ['type', 'name', 'subjectId', 'nmIds'],
  },
};

export const createCampaignHandler: ToolHandler = async (params) => {
  try {
    logger.info('Creating campaign', { name: params.name, type: params.type });
    const response = await wbAdvClient.post('/adv/v2/seacat/save-ad', {
      type: params.type,
      name: params.name,
      subjectId: params.subjectId,
      nmIds: params.nmIds,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to create campaign', { error });
    return formatError(error, 'wb_create_campaign');
  }
};
