/**
 * Инструмент для получения списка товаров
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { Products } from '../../types/api.js';
import { ToolDefinition, ToolHandler, ProductToolSchemas } from '../../types/tools.js';
import { validate } from '../../utils/validator.js';
import { formatList, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

/**
 * Определение инструмента
 */
export const getProductsTool: ToolDefinition = {
  name: 'wb_get_products',
  description: 
    'Получить список товаров продавца из Wildberries. ' +
    'Поддерживает пагинацию, поиск по названию и фильтрацию по бренду и дате обновления.',
  inputSchema: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Количество товаров на странице (максимум 1000, по умолчанию 100)',
        default: 100,
      },
      offset: {
        type: 'number',
        description: 'Смещение для пагинации (по умолчанию 0)',
        default: 0,
      },
      search: {
        type: 'string',
        description: 'Поиск по названию товара',
      },
      brandID: {
        type: 'number',
        description: 'Фильтр по ID бренда',
      },
      updatedAtFrom: {
        type: 'string',
        description: 'Фильтр по дате обновления (от). Формат: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)',
      },
      updatedAtTo: {
        type: 'string',
        description: 'Фильтр по дате обновления (до). Формат: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)',
      },
    },
  },
};

/**
 * Обработчик инструмента
 */
export const getProductsHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(ProductToolSchemas.getProducts, params);
    
    logger.info('Getting products', validatedParams);

    // Формируем параметры запроса
    const queryParams: Products.GetProductsParams = {
      limit: validatedParams.limit,
      offset: validatedParams.offset,
      ...(validatedParams.search && { search: validatedParams.search }),
      ...(validatedParams.brandID && { brandID: validatedParams.brandID }),
      ...(validatedParams.updatedAtFrom && { updatedAtFrom: validatedParams.updatedAtFrom }),
      ...(validatedParams.updatedAtTo && { updatedAtTo: validatedParams.updatedAtTo }),
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbContentClient.get<{ data: Products.Product[]; cursor?: { total: number } }>(
      '/content/v2/get/cards/list',
      queryParams
    );

    const products = response.data || [];
    const total = response.cursor?.total;

    logger.info('Products retrieved successfully', { 
      count: products.length, 
      total 
    });

    return formatList(products, {
      total,
      limit: validatedParams.limit,
      offset: validatedParams.offset,
      hasMore: total ? validatedParams.offset + products.length < total : false,
    });
  } catch (error) {
    logger.error('Failed to get products', { error });
    return formatError(error, 'wb_get_products');
  }
};
