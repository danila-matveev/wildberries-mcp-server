/**
 * Инструмент для загрузки цен по размерам
 */

import { wbDiscountsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const uploadSizePricesTool: ToolDefinition = {
  name: 'wb_upload_size_prices',
  description: 'Загрузить цены для конкретных размеров товаров.',
  inputSchema: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            nmID: { type: 'number', description: 'ID номенклатуры' },
            sizeID: { type: 'number', description: 'ID размера' },
            price: { type: 'number', description: 'Цена товара' },
          },
          required: ['nmID', 'sizeID', 'price'],
        },
        description: 'Массив товаров с ценами по размерам',
      },
    },
    required: ['data'],
  },
};

export const uploadSizePricesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Uploading size prices', { count: (params.data as unknown[])?.length });
    const { data } = params as { data: Array<{ nmID: number; sizeID: number; price: number }> };
    const response = await wbDiscountsClient.post('/api/v2/upload/task/size', { data });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to upload size prices', { error });
    return formatError(error, 'wb_upload_size_prices');
  }
};
