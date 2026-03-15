/**
 * Инструмент для получения групп поискового отчёта
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getSearchReportGroupsTool: ToolDefinition = {
  name: 'wb_get_search_report_groups',
  description: 'Получить группы поискового отчёта (таблица групп запросов).',
  inputSchema: {
    type: 'object',
    properties: {
      dateFrom: {
        type: 'string',
        description: 'Дата начала периода (YYYY-MM-DD)',
      },
      dateTo: {
        type: 'string',
        description: 'Дата окончания периода (YYYY-MM-DD)',
      },
      page: {
        type: 'number',
        description: 'Номер страницы',
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getSearchReportGroupsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting search report groups', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbAnalyticsNewClient.post('/api/v2/search-report/table/groups', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get search report groups', { error });
    return formatError(error, 'wb_get_search_report_groups');
  }
};
