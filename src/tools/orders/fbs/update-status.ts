/**
 * Инструмент для обновления статуса заказа FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { Orders } from '../../../types/api.js';
import { ToolDefinition, ToolHandler, OrderToolSchemas } from '../../../types/tools.js';
import { validate } from '../../../utils/validator.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

/**
 * Определение инструмента
 */
export const updateStatusTool: ToolDefinition = {
  name: 'wb_update_order_status_fbs',
  description:
    'Обновить статус заказа FBS. ' +
    'Позволяет изменить статус заказа (подтвердить, завершить, отменить).',
  inputSchema: {
    type: 'object',
    properties: {
      orderUID: {
        type: 'string',
        description: 'Уникальный идентификатор заказа',
      },
      status: {
        type: 'string',
        description: 'Новый статус заказа',
        enum: ['new', 'confirm', 'complete', 'cancel', 'cancel_by_client'],
      },
    },
    required: ['orderUID', 'status'],
  },
};

/**
 * Обработчик инструмента
 */
export const updateStatusHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(OrderToolSchemas.updateStatus, params);

    logger.info('Updating FBS order status', {
      orderUID: validatedParams.orderUID,
      status: validatedParams.status,
    });

    // Формируем данные для обновления
    const updateData: Orders.UpdateStatusParams = {
      orderUID: validatedParams.orderUID,
      status: validatedParams.status,
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbMarketplaceClient.patch(
      '/api/v3/orders/status',
      updateData
    );

    logger.info('FBS order status updated successfully', {
      orderUID: validatedParams.orderUID,
      status: validatedParams.status,
    });

    return formatApiResponse(response, {
      orderUID: validatedParams.orderUID,
      status: validatedParams.status,
      operation: 'update_status',
    });
  } catch (error) {
    logger.error('Failed to update FBS order status', { error });
    return formatError(error, 'wb_update_order_status_fbs');
  }
};
