/**
 * Инструмент для обновления цен товара
 */

import { wbClient } from '../../client/wildberries-client.js';
import { Products } from '../../types/api.js';
import { ToolDefinition, ToolHandler, ProductToolSchemas } from '../../types/tools.js';
import { validate } from '../../utils/validator.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

/**
 * Определение инструмента
 */
export const updatePricesTool: ToolDefinition = {
  name: 'wb_update_product_price',
  description:
    'Обновить цену товара и/или скидку. ' +
    'Позволяет изменить стоимость товара в каталоге Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      nmID: {
        type: 'number',
        description: 'Артикул WB (nmID) товара',
      },
      price: {
        type: 'number',
        description: 'Новая цена товара (в рублях)',
      },
      discount: {
        type: 'number',
        description: 'Скидка в процентах (0-100)',
      },
    },
    required: ['nmID', 'price'],
  },
};

/**
 * Обработчик инструмента
 */
export const updatePricesHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(ProductToolSchemas.updatePrice, params);

    logger.info('Updating product price', { 
      nmID: validatedParams.nmID,
      price: validatedParams.price,
    });

    // Формируем данные для обновления
    const updateData: Products.UpdatePriceParams = {
      nmID: validatedParams.nmID,
      price: validatedParams.price,
      ...(validatedParams.discount !== undefined && { 
        discount: validatedParams.discount 
      }),
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbClient.post(
      '/public/api/v1/prices',
      [updateData]
    );

    logger.info('Product price updated successfully', { 
      nmID: validatedParams.nmID 
    });

    return formatApiResponse(response, {
      nmID: validatedParams.nmID,
      operation: 'update_price',
      price: validatedParams.price,
      discount: validatedParams.discount,
    });
  } catch (error) {
    logger.error('Failed to update product price', { error });
    return formatError(error, 'wb_update_product_price');
  }
};
