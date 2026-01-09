/**
 * Инструмент для получения воронки продаж
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { Analytics } from '../../types/api.js';
import { ToolDefinition, ToolHandler, AnalyticsToolSchemas } from '../../types/tools.js';
import { validate } from '../../utils/validator.js';
import { formatList, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

/**
 * Определение инструмента
 */
export const getSalesFunnelTool: ToolDefinition = {
  name: 'wb_get_sales_funnel',
  description:
    'Получить воронку продаж товаров. ' +
    'Показывает путь покупателя: просмотры → добавления в корзину → заказы → выкупы → отмены.',
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
      nmID: {
        type: 'number',
        description: 'Артикул WB (nmID) товара для фильтрации',
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

/**
 * Обработчик инструмента
 */
export const getSalesFunnelHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(AnalyticsToolSchemas.getSalesFunnel, params);

    logger.info('Getting sales funnel analytics', {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
    });

    // Формируем параметры запроса
    const queryParams: Analytics.GetSalesFunnelParams = {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
      ...(validatedParams.nmID && { nmID: validatedParams.nmID }),
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbStatisticsClient.get<Analytics.SalesFunnel[]>(
      '/api/v1/supplier/analytics/sales-funnel',
      queryParams
    );

    const funnel = Array.isArray(response) ? response : [];

    logger.info('Sales funnel retrieved successfully', {
      count: funnel.length,
    });

    return formatList(funnel);
  } catch (error) {
    logger.error('Failed to get sales funnel', { error });
    return formatError(error, 'wb_get_sales_funnel');
  }
};
