/**
 * Инструмент для получения истории остатков
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
export const getStockHistoryTool: ToolDefinition = {
  name: 'wb_get_stock_history',
  description:
    'Получить историю остатков товара по складам. ' +
    'Показывает изменение количества товара на складах за указанный период.',
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
        description: 'Артикул WB (nmID) товара',
      },
    },
    required: ['dateFrom', 'dateTo', 'nmID'],
  },
};

/**
 * Обработчик инструмента
 */
export const getStockHistoryHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(AnalyticsToolSchemas.getStockHistory, params);

    logger.info('Getting stock history analytics', {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
      nmID: validatedParams.nmID,
    });

    // Формируем параметры запроса
    const queryParams: Analytics.GetStockHistoryParams = {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
      nmID: validatedParams.nmID,
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbStatisticsClient.get<Analytics.StockHistory[]>(
      '/api/v1/supplier/analytics/stock-history',
      queryParams
    );

    const history = Array.isArray(response) ? response : [];

    logger.info('Stock history retrieved successfully', {
      count: history.length,
      nmID: validatedParams.nmID,
    });

    return formatList(history);
  } catch (error) {
    logger.error('Failed to get stock history', { error });
    return formatError(error, 'wb_get_stock_history');
  }
};
