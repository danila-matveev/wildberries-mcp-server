/**
 * Инструмент для загрузки цен товаров
 */

import { wbDiscountsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const uploadPricesTool: ToolDefinition = {
  name: 'wb_upload_prices',
  description: 'Загрузить цены и скидки для товаров.',
  inputSchema: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            nmID: { type: 'number', description: 'ID номенклатуры' },
            price: { type: 'number', description: 'Цена товара' },
            discount: { type: 'number', description: 'Скидка в процентах' },
          },
          required: ['nmID', 'price'],
        },
        description: 'Массив товаров с ценами и скидками',
      },
    },
    required: ['data'],
  },
};

export const uploadPricesHandler: ToolHandler = async (params) => {
  try {
    logger.info('Uploading prices', { count: (params.data as unknown[])?.length });
    const { data } = params as { data: Array<{ nmID: number; price: number; discount?: number }> };
    const response = await wbDiscountsClient.post('/api/v2/upload/task', { data });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to upload prices', { error });
    return formatError(error, 'wb_upload_prices');
  }
};
