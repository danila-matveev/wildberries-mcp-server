/**
 * Инструмент для получения списка предметов (подкатегорий)
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getSubjectsTool: ToolDefinition = {
  name: 'wb_get_subjects',
  description: 'Получить список предметов (подкатегорий) товаров Wildberries. Можно искать по названию.',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Поиск по названию предмета' },
      locale: { type: 'string', description: 'Локаль (ru, en, etc.)', default: 'ru' },
    },
  },
};

export const getSubjectsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting subjects', params);
    const response = await wbContentClient.get('/content/v2/object/all', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get subjects', { error });
    return formatError(error, 'wb_get_subjects');
  }
};
