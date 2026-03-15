/**
 * Инструмент для получения списка полов
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getGenderKindsTool: ToolDefinition = {
  name: 'wb_get_gender_kinds',
  description: 'Получить справочник полов Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: { type: 'string', description: 'Локаль (ru, en, etc.)', default: 'ru' },
    },
  },
};

export const getGenderKindsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting gender kinds', params);
    const response = await wbContentClient.get('/content/v2/directory/kinds', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get gender kinds', { error });
    return formatError(error, 'wb_get_gender_kinds');
  }
};
