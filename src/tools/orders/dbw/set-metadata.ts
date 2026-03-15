/**
 * Инструмент для установки метаданных заказа DBW
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const setMetadataDbwTool: ToolDefinition = {
  name: 'wb_set_metadata_dbw',
  description:
    'Установить метаданные (КиЗ/SGTIN, УИН, IMEI, GTIN) для конкретного заказа DBW.',
  inputSchema: {
    type: 'object',
    properties: {
      orderId: {
        type: 'number',
        description: 'Идентификатор заказа',
      },
      metaType: {
        type: 'string',
        enum: ['sgtin', 'uin', 'imei', 'gtin'],
        description: 'Тип метаданных: sgtin (КиЗ), uin (УИН), imei, gtin',
      },
      value: {
        type: 'string',
        description: 'Значение метаданных',
      },
    },
    required: ['orderId', 'metaType', 'value'],
  },
};

export const setMetadataDbwHandler: ToolHandler = async (params) => {
  try {
    const { orderId, metaType, value } = params as {
      orderId: number;
      metaType: string;
      value: string;
    };

    logger.info('Setting DBW order metadata', { orderId, metaType });

    const response = await wbMarketplaceClient.put(
      `/api/v3/dbw/orders/${orderId}/meta/${metaType}`,
      { value }
    );

    logger.info('DBW order metadata set successfully', { orderId, metaType });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to set DBW order metadata', { error });
    return formatError(error, 'wb_set_metadata_dbw');
  }
};
