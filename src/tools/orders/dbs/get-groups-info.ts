/**
 * Инструмент для получения информации о группах заказов DBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getGroupsInfoDbsTool: ToolDefinition = {
  name: 'wb_get_groups_info_dbs',
  description:
    'Получить информацию о группах заказов DBS (группировка заказов по направлениям доставки).',
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

export const getGroupsInfoDbsHandler: ToolHandler = async (params) => {
  try {
    const { orderIds } = params as { orderIds: number[] };

    logger.info('Getting DBS groups info', { orderIds });

    const response = await wbMarketplaceClient.post(
      '/api/v3/dbs/groups/info',
      { orders: orderIds }
    );

    logger.info('DBS groups info retrieved successfully');

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBS groups info', { error });
    return formatError(error, 'wb_get_groups_info_dbs');
  }
};
