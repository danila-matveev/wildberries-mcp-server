/**
 * Инструмент для получения коэффициентов приёмки
 */

import { wbClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getAcceptanceCoefficientsTool: ToolDefinition = {
  name: 'wb_get_acceptance_tariffs',
  description: 'Получить коэффициенты приёмки на складах Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      warehouseId: {
        type: 'number',
        description: 'ID склада для фильтрации',
      },
    },
  },
};

export const getAcceptanceCoefficientsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting acceptance coefficients', params);
    const response = await wbClient.get('/api/tariffs/v1/acceptance/coefficients', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get acceptance coefficients', { error });
    return formatError(error, 'wb_get_acceptance_tariffs');
  }
};
