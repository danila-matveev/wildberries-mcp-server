/**
 * Инструмент для получения ставок НДС
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getVatRatesTool: ToolDefinition = {
  name: 'wb_get_vat_rates',
  description: 'Получить справочник ставок НДС Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getVatRatesHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting VAT rates');
    const response = await wbContentClient.get('/content/v2/directory/vat');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get VAT rates', { error });
    return formatError(error, 'wb_get_vat_rates');
  }
};
