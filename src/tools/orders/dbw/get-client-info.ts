/**
 * Инструмент для получения информации о клиенте заказов DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getClientInfoDbwTool: ToolDefinition = {
  name: 'wb_get_client_info_dbw',
  description:
    'Получить информацию о клиенте (ФИО, адрес, контакты) для заказов DBW.',
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

export const getClientInfoDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBW client info', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/marketplace/v3/dbw/orders/client',
      { orders: orderIds }
    );

    logger.info('DBW client info retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBW client info', { error });
    return formatError(error, 'wb_get_client_info_dbw');
  }
};
