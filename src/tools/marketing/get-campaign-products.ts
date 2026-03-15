/**
 * Инструмент для получения товаров для рекламных кампаний
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getCampaignProductsTool: ToolDefinition = {
  name: 'wb_get_campaign_products',
  description: 'Получить список товаров, доступных для рекламных кампаний.',
  inputSchema: {
    type: 'object',
    properties: {
      nmIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив артикулов WB для фильтрации',
      },
    },
  },
};

export const getCampaignProductsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting campaign products', params);
    const body: Record<string, unknown> = {};
    if (params.nmIds) body.nmIds = params.nmIds;
    const response = await wbAdvClient.post('/adv/v2/supplier/nms', body);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get campaign products', { error });
    return formatError(error, 'wb_get_campaign_products');
  }
};
