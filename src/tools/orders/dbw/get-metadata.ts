/**
 * Инструмент для получения метаданных заказа DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getMetadataDbwTool: ToolDefinition = {
  name: 'wb_get_metadata_dbw',
  description:
    'Получить метаданные (КиЗ, УИН, IMEI, GTIN) для конкретного заказа DBW.',
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

export const getMetadataDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderId } = params as { orderId: number };

    logger.info('Getting DBW order metadata', { orderId });

    const response = await wbMarketplaceClient.get(
      `/api/v3/dbw/orders/${orderId}/meta`
    );

    logger.info('DBW order metadata retrieved successfully', { orderId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get DBW order metadata', { error });
    return formatError(error, 'wb_get_metadata_dbw');
  }
};
