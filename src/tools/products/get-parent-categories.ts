/**
 * Инструмент для получения родительских категорий товаров
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getParentCategoriesTool: ToolDefinition = {
  name: 'wb_get_parent_categories',
  description: 'Получить список родительских категорий товаров Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: { type: 'string', description: 'Локаль (ru, en, etc.)', default: 'ru' },
    },
  },
};

export const getParentCategoriesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting parent categories', params);
    const response = await wbContentClient.get('/content/v2/object/parent/all', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get parent categories', { error });
    return formatError(error, 'wb_get_parent_categories');
  }
};
