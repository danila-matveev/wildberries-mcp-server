/**
 * Инструмент для получения поисковых запросов
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
export const getSearchQueriesTool: ToolDefinition = {
  name: 'wb_get_search_queries',
  description:
    'Получить статистику поисковых запросов по товарам. ' +
    'Показывает, какие ключевые слова используют покупатели для поиска товаров.',
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
export const getSearchQueriesHandler: ToolHandler = async (params) => {
  try {
    // Валидация параметров
    const validatedParams = validate(AnalyticsToolSchemas.getSearchQueries, params);

    logger.info('Getting search queries analytics', {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
    });

    // Формируем параметры запроса
    const queryParams: Analytics.GetSearchQueriesParams = {
      dateFrom: validatedParams.dateFrom,
      dateTo: validatedParams.dateTo,
      ...(validatedParams.nmID && { nmID: validatedParams.nmID }),
    };

    // Выполняем запрос к API
    // Примечание: реальный endpoint может отличаться, нужно проверить документацию
    const response = await wbStatisticsClient.get<Analytics.SearchQuery[]>(
      '/api/v1/supplier/analytics/search-queries',
      queryParams
    );

    const queries = Array.isArray(response) ? response : [];

    logger.info('Search queries retrieved successfully', {
      count: queries.length,
    });

    return formatList(queries);
  } catch (error) {
    logger.error('Failed to get search queries', { error });
    return formatError(error, 'wb_get_search_queries');
  }
};
