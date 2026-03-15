/**
 * Инструмент для получения списка стран
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getCountriesTool: ToolDefinition = {
  name: 'wb_get_countries',
  description: 'Получить справочник стран Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: { type: 'string', description: 'Локаль (ru, en, etc.)', default: 'ru' },
    },
  },
};

export const getCountriesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting countries', params);
    const response = await wbContentClient.get('/content/v2/directory/countries', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get countries', { error });
    return formatError(error, 'wb_get_countries');
  }
};
