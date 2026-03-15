/**
 * Инструмент для изменения товаров в рекламной кампании
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const changeCampaignProductsTool: ToolDefinition = {
  name: 'wb_change_campaign_products',
  description: 'Добавить или удалить товары в рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
      },
      nmIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив артикулов WB',
      },
      action: {
        type: 'string',
        enum: ['add', 'delete'],
        description: 'Действие: add (добавить) или delete (удалить)',
      },
    },
    required: ['advertId', 'nmIds'],
  },
};

export const changeCampaignProductsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Changing campaign products', { advertId: params.advertId, action: params.action });
    const body: Record<string, unknown> = {
      advertId: params.advertId,
      nmIds: params.nmIds,
    };
    if (params.action) body.action = params.action;
    const response = await wbAdvClient.patch('/adv/v0/auction/nms', body);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to change campaign products', { error });
    return formatError(error, 'wb_change_campaign_products');
  }
};
