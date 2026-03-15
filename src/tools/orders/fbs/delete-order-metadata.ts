/**
 * Инструмент для удаления метаданных заказа FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const deleteOrderMetadataTool: ToolDefinition = {
  name: 'wb_delete_order_metadata',
  description:
    'Удалить метаданные (КиЗ, УИН, IMEI и др.) для конкретного сборочного задания FBS.',
  inputSchema: {
    type: 'object',
    properties: {
      orderId: {
        type: 'number',
        description: 'Идентификатор заказа',
      },
    },
    required: ['orderId'],
  },
};

export const deleteOrderMetadataHandler: ToolHandler = async (params) => {
  try {
    const { orderId } = params as { orderId: number };

    logger.info('Deleting FBS order metadata', { orderId });

    const response = await wbMarketplaceClient.delete(
      `/api/v3/orders/${orderId}/meta`
    );

    logger.info('FBS order metadata deleted successfully', { orderId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to delete FBS order metadata', { error });
    return formatError(error, 'wb_delete_order_metadata');
  }
};
