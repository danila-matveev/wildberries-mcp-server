/**
 * Инструмент для получения тарифов на возвраты
 */

import { wbClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getReturnTariffsTool: ToolDefinition = {
  name: 'wb_get_return_tariffs',
  description: 'Получить тарифы на возвраты товаров.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: {
        type: 'string',
        description: 'Локаль (например, ru)',
      },
    },
  },
};

export const getReturnTariffsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting return tariffs', params);
    const response = await wbClient.get('/api/v1/tariffs/return', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get return tariffs', { error });
    return formatError(error, 'wb_get_return_tariffs');
  }
};
