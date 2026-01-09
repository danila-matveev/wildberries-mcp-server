/**
 * Инструмент для получения сборочных заданий FBS
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
export const getPickingTasksTool: ToolDefinition = {
  name: 'wb_get_picking_tasks_fbs',
  description:
    'Получить список сборочных заданий FBS. ' +
    'Сборочное задание - это задача на сборку и отправку товара покупателю.',
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
        description: 'Фильтр по статусу сборочного задания',
        enum: ['new', 'confirm', 'complete', 'cancel', 'cancel_by_client'],
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

/**
 * Обработчик инструмента
 */
export const getPickingTasksHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(OrderToolSchemas.getPickingTasks, params);

    logger.info('Getting FBS picking tasks', {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
    });

    // Формируем параметры запроса
    const queryParams: Orders.GetPickingTasksParams = {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
      ...(validatedParams.status && { status: validatedParams.status }),
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbMarketplaceClient.get<{ orders: Orders.PickingTask[] }>(
      '/api/v3/supplies/orders',
      queryParams
    );

    const tasks = response.orders || [];

    logger.info('FBS picking tasks retrieved successfully', {
      count: tasks.length,
    });

    return formatList(tasks);
  } catch (error) {
    logger.error('Failed to get FBS picking tasks', { error });
    return formatError(error, 'wb_get_picking_tasks_fbs');
  }
};
