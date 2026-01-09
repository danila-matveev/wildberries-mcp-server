/**
 * Инструмент для получения списка заказов FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { Orders } from '../../../types/api.js';
import { ToolDefinition, ToolHandler, OrderToolSchemas } from '../../../types/tools.js';
import { validate } from '../../../utils/validator.js';
import { formatList, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

/**
 * Определение инструмента
 */
export const getOrdersTool: ToolDefinition = {
  name: 'wb_get_orders_fbs',
  description:
    'Получить список заказов FBS (Fulfillment by Seller - сборка продавцом). ' +
    'Поддерживает фильтрацию по дате и статусу заказов.',
  inputSchema: {
    type: 'object',
    properties: {
      dateFrom: {
        type: 'string',
        description: 'Дата начала периода. Формат: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)',
      },
      dateTo: {
        type: 'string',
        description: 'Дата окончания периода. Формат: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)',
      },
      status: {
        type: 'string',
        description: 'Фильтр по статусу заказа',
        enum: ['new', 'confirm', 'complete', 'cancel', 'cancel_by_client'],
      },
      take: {
        type: 'number',
        description: 'Количество заказов на странице (максимум 1000, по умолчанию 100)',
        default: 100,
      },
      skip: {
        type: 'number',
        description: 'Пропустить N заказов (для пагинации, по умолчанию 0)',
        default: 0,
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

/**
 * Обработчик инструмента
 */
export const getOrdersHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(OrderToolSchemas.getOrders, params);

    logger.info('Getting FBS orders', {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
    });

    // Формируем параметры запроса
    const queryParams: Orders.GetOrdersParams = {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
      ...(validatedParams.status && { status: validatedParams.status }),
      take: validatedParams.take,
      skip: validatedParams.skip,
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbMarketplaceClient.get<{ orders: Orders.Order[] }>(
      '/api/v3/orders',
      queryParams
    );

    const orders = response.orders || [];

    logger.info('FBS orders retrieved successfully', {
      count: orders.length,
    });

    return formatList(orders, {
      total: orders.length,
      limit: validatedParams.take,
      offset: validatedParams.skip,
    });
  } catch (error) {
    logger.error('Failed to get FBS orders', { error });
    return formatError(error, 'wb_get_orders_fbs');
  }
};
