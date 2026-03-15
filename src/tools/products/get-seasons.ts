/**
 * Инструмент для получения списка сезонов
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getSeasonsTool: ToolDefinition = {
  name: 'wb_get_seasons',
  description: 'Получить справочник сезонов Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: { type: 'string', description: 'Локаль (ru, en, etc.)', default: 'ru' },
    },
  },
};

export const getSeasonsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting seasons', params);
    const response = await wbContentClient.get('/content/v2/directory/seasons', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get seasons', { error });
    return formatError(error, 'wb_get_seasons');
  }
};
