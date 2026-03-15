/**
 * Инструмент для добавления заказов в поставку FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const addOrdersToSupplyTool: ToolDefinition = {
  name: 'wb_add_orders_to_supply',
  description:
    'Добавить заказы в поставку FBS. Привязывает сборочные задания к указанной поставке.',
  inputSchema: {
    type: 'object',
    properties: {
      supplyId: {
        type: 'string',
        description: 'Идентификатор поставки (например, WB-GI-1234567)',
      },
      orderIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив идентификаторов заказов для добавления в поставку',
      },
    },
    required: ['supplyId', 'orderIds'],
  },
};

export const addOrdersToSupplyHandler: ToolHandler = async (params) => {
  try {
    const { supplyId, orderIds } = params as {
      supplyId: string;
      orderIds: number[];
    };

    logger.info('Adding orders to FBS supply', { supplyId, orderIds });

    const response = await wbMarketplaceClient.patch(
      `/api/marketplace/v3/supplies/${supplyId}/orders`,
      { orders: orderIds }
    );

    logger.info('Orders added to FBS supply successfully', { supplyId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to add orders to FBS supply', { error });
    return formatError(error, 'wb_add_orders_to_supply');
  }
};
