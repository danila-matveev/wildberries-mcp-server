/**
 * Инструмент для установки метаданных заказа FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const setOrderMetadataTool: ToolDefinition = {
  name: 'wb_set_order_metadata',
  description:
    'Установить метаданные (КиЗ/SGTIN, УИН, IMEI, GTIN, срок годности) для конкретного сборочного задания FBS.',
  inputSchema: {
    type: 'object',
    properties: {
      orderId: {
        type: 'number',
        description: 'Идентификатор заказа',
      },
      metaType: {
        type: 'string',
        enum: ['sgtin', 'uin', 'imei', 'gtin', 'expiration'],
        description: 'Тип метаданных: sgtin (КиЗ), uin (УИН), imei, gtin, expiration (срок годности)',
      },
      value: {
        type: 'string',
        description: 'Значение метаданных',
      },
    },
    required: ['orderId', 'metaType', 'value'],
  },
};

export const setOrderMetadataHandler: ToolHandler = async (params) => {
  try {
    const { orderId, metaType, value } = params as {
      orderId: number;
      metaType: string;
      value: string;
    };

    logger.info('Setting FBS order metadata', { orderId, metaType });

    const response = await wbMarketplaceClient.put(
      `/api/v3/orders/${orderId}/meta/${metaType}`,
      { value }
    );

    logger.info('FBS order metadata set successfully', { orderId, metaType });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to set FBS order metadata', { error });
    return formatError(error, 'wb_set_order_metadata');
  }
};
