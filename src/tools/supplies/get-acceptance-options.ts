/**
 * Инструмент для получения вариантов приёмки
 */

import { wbMarketplaceClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getAcceptanceOptionsTool: ToolDefinition = {
  name: 'wb_get_acceptance_options',
  description: 'Получить варианты приёмки для указанных товаров (доступные склады, даты, коэффициенты).',
  inputSchema: {
    type: 'object',
    properties: {
      nmIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив артикулов WB',
      },
    },
    required: ['nmIDs'],
  },
};

export const getAcceptanceOptionsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting acceptance options', { nmIDs: params.nmIDs });
    const response = await wbMarketplaceClient.post('/api/v1/acceptance/options', {
      nmIDs: params.nmIDs,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get acceptance options', { error });
    return formatError(error, 'wb_get_acceptance_options');
  }
};
