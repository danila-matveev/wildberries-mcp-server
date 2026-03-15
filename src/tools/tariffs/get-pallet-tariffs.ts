/**
 * Инструмент для получения тарифов на паллеты
 */

import { wbClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getPalletTariffsTool: ToolDefinition = {
  name: 'wb_get_pallet_tariffs',
  description: 'Получить тарифы на доставку паллетами.',
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

export const getPalletTariffsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting pallet tariffs', params);
    const response = await wbClient.get('/api/v1/tariffs/pallet', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get pallet tariffs', { error });
    return formatError(error, 'wb_get_pallet_tariffs');
  }
};
