/**
 * Инструмент для обновления контента товара
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { Products } from '../../types/api.js';
import { ToolDefinition, ToolHandler, ProductToolSchemas } from '../../types/tools.js';
import { validate } from '../../utils/validator.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

/**
 * Определение инструмента
 */
export const updateContentTool: ToolDefinition = {
  name: 'wb_update_product_content',
  description:
    'Обновить контент товара: название, описание и характеристики. ' +
    'Позволяет изменить информацию о товаре в каталоге Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      nmID: {
        type: 'number',
        description: 'Артикул WB (nmID) товара',
      },
      title: {
        type: 'string',
        description: 'Новое название товара',
      },
      description: {
        type: 'string',
        description: 'Новое описание товара',
      },
      characteristics: {
        type: 'array',
        description: 'Массив характеристик товара',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'ID характеристики',
            },
            name: {
              type: 'string',
              description: 'Название характеристики',
            },
            value: {
              description: 'Значение характеристики (строка или число)',
            },
          },
          required: ['id', 'name', 'value'],
        },
      },
    },
    required: ['nmID'],
  },
};

/**
 * Обработчик инструмента
 */
export const updateContentHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(ProductToolSchemas.updateContent, params);

    logger.info('Updating product content', { nmID: validatedParams.nmID });

    // Формируем данные для обновления
    const updateData: Products.UpdateContentParams = {
      nmID: validatedParams.nmID,
      ...(validatedParams.title && { title: validatedParams.title }),
      ...(validatedParams.description && { description: validatedParams.description }),
      ...(validatedParams.characteristics && { 
        characteristics: validatedParams.characteristics 
      }),
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbContentClient.post(
      '/content/v2/cards/update',
      updateData
    );

    logger.info('Product content updated successfully', { 
      nmID: validatedParams.nmID 
    });

    return formatApiResponse(response, {
      nmID: validatedParams.nmID,
      operation: 'update_content',
    });
  } catch (error) {
    logger.error('Failed to update product content', { error });
    return formatError(error, 'wb_update_product_content');
  }
};
