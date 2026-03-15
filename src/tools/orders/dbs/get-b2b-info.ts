/**
 * Инструмент для получения B2B информации заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getB2bInfoDbsTool: ToolDefinition = {
  name: 'wb_get_b2b_info_dbs',
  description:
    'Получить B2B информацию для заказов DBS (данные юридического лица, реквизиты).',
  inputSchema: {
    type: 'object',
    properties: {
      orderIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив идентификаторов заказов',
      },
    },
    required: ['orderIds'],
  },
};

export const getB2bInfoDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBS B2B info', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/dbs/orders/b2b/info',
      { orders: orderIds }
    );

    logger.info('DBS B2B info retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBS B2B info', { error });
    return formatError(error, 'wb_get_b2b_info_dbs');
  }
};
