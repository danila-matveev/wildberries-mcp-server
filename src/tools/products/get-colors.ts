/**
 * Инструмент для получения списка цветов
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getColorsTool: ToolDefinition = {
  name: 'wb_get_colors',
  description: 'Получить справочник цветов Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: { type: 'string', description: 'Локаль (ru, en, etc.)', default: 'ru' },
    },
  },
};

export const getColorsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting colors', params);
    const response = await wbContentClient.get('/content/v2/directory/colors', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get colors', { error });
    return formatError(error, 'wb_get_colors');
  }
};
