/**
 * Инструмент для получения тарифов на короба
 */

import { wbClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getBoxTariffsTool: ToolDefinition = {
  name: 'wb_get_box_tariffs',
  description: 'Получить тарифы на доставку коробами.',
  inputSchema: {
    type: 'object',
    properties: {
      date: {
        type: 'string',
        description: 'Дата для получения тарифов (YYYY-MM-DD)',
      },
    },
  },
};

export const getBoxTariffsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting box tariffs', params);
    const response = await wbClient.get('/api/v1/tariffs/box', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get box tariffs', { error });
    return formatError(error, 'wb_get_box_tariffs');
  }
};
