/**
 * Инструмент для получения списка рекламных кампаний
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getCampaignsTool: ToolDefinition = {
  name: 'wb_get_campaigns',
  description: 'Получить список рекламных кампаний с фильтрацией по статусу, типу и сортировкой.',
  inputSchema: {
    type: 'object',
    properties: {
      status: {
        type: 'number',
        description: 'Статус кампании',
      },
      type: {
        type: 'number',
        description: 'Тип кампании',
      },
      order: {
        type: 'string',
        description: 'Сортировка',
      },
      limit: {
        type: 'number',
        description: 'Количество записей',
      },
      offset: {
        type: 'number',
        description: 'Смещение',
      },
    },
  },
};

export const getCampaignsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting campaigns', params);
    const response = await wbAdvClient.get('/api/advert/v2/adverts', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get campaigns', { error });
    return formatError(error, 'wb_get_campaigns');
  }
};
