/**
 * Инструмент для создания поставки FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const createSupplyTool: ToolDefinition = {
  name: 'wb_create_supply',
  description:
    'Создать новую поставку FBS. Поставка объединяет несколько заказов для отправки на склад Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Название поставки',
      },
    },
    required: ['name'],
  },
};

export const createSupplyHandler: ToolHandler = async (params) => {
  try {
    const { name } = params as { name: string };

    logger.info('Creating FBS supply', { name });

    const response = await wbMarketplaceClient.post('/api/v3/supplies', {
      name,
    });

    logger.info('FBS supply created successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to create FBS supply', { error });
    return formatError(error, 'wb_create_supply');
  }
};
