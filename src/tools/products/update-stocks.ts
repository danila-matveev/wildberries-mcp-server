/**
 * Инструмент для обновления остатков товара
 */

import { wbMarketplaceClient } from '../../client/wildberries-client.js';
import { Products } from '../../types/api.js';
import { ToolDefinition, ToolHandler, ProductToolSchemas } from '../../types/tools.js';
import { validate } from '../../utils/validator.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

/**
 * Определение инструмента
 */
export const updateStocksTool: ToolDefinition = {
  name: 'wb_update_product_stock',
  description:
    'Обновить количество товара на складе. ' +
    'Позволяет изменить остатки товара на конкретном складе Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      nmID: {
        type: 'number',
        description: 'Артикул WB (nmID) товара',
      },
      warehouseID: {
        type: 'number',
        description: 'ID склада',
      },
      quantity: {
        type: 'number',
        description: 'Количество товара (должно быть >= 0)',
      },
    },
    required: ['nmID', 'warehouseID', 'quantity'],
  },
};

/**
 * Обработчик инструмента
 */
export const updateStocksHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(ProductToolSchemas.updateStock, params);

    logger.info('Updating product stock', {
      nmID: validatedParams.nmID,
      warehouseID: validatedParams.warehouseID,
      quantity: validatedParams.quantity,
    });

    // Формируем данные для обновления
    const updateData: Products.UpdateStockParams = {
      nmID: validatedParams.nmID,
      warehouseID: validatedParams.warehouseID,
      quantity: validatedParams.quantity,
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbMarketplaceClient.post(
      '/api/v3/stocks',
      [updateData]
    );

    logger.info('Product stock updated successfully', {
      nmID: validatedParams.nmID,
      quantity: validatedParams.quantity,
    });

    return formatApiResponse(response, {
      nmID: validatedParams.nmID,
      warehouseID: validatedParams.warehouseID,
      quantity: validatedParams.quantity,
      operation: 'update_stock',
    });
  } catch (error) {
    logger.error('Failed to update product stock', { error });
    return formatError(error, 'wb_update_product_stock');
  }
};
