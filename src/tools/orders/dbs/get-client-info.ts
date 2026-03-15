/**
 * Инструмент для получения информации о клиенте заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getClientInfoDbsTool: ToolDefinition = {
  name: 'wb_get_client_info_dbs',
  description:
    'Получить информацию о клиенте (ФИО, адрес, контакты) для заказов DBS.',
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

export const getClientInfoDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBS client info', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/dbs/orders/client',
      { orders: orderIds }
    );

    logger.info('DBS client info retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBS client info', { error });
    return formatError(error, 'wb_get_client_info_dbs');
  }
};
