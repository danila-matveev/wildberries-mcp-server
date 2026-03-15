/**
 * Инструмент для получения тарифов на транзит
 */

import { wbMarketplaceClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getTransitTariffsTool: ToolDefinition = {
  name: 'wb_get_transit_tariffs',
  description: 'Получить тарифы на транзит товаров между складами.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getTransitTariffsHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting transit tariffs');
    const response = await wbMarketplaceClient.get('/api/v1/transit-tariffs');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get transit tariffs', { error });
    return formatError(error, 'wb_get_transit_tariffs');
  }
};
