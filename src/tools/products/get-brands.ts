/**
 * Инструмент для получения списка брендов
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getBrandsTool: ToolDefinition = {
  name: 'wb_get_brands',
  description: 'Получить список брендов продавца. Можно искать по названию.',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Поиск по названию бренда' },
      locale: { type: 'string', description: 'Локаль (ru, en, etc.)', default: 'ru' },
    },
  },
};

export const getBrandsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting brands', params);
    const response = await wbContentClient.get('/api/content/v1/brands', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get brands', { error });
    return formatError(error, 'wb_get_brands');
  }
};
