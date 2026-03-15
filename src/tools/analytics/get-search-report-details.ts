/**
 * Инструмент для получения деталей группы поискового отчёта
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getSearchReportDetailsTool: ToolDefinition = {
  name: 'wb_get_search_report_details',
  description: 'Получить детали конкретной группы поискового отчёта.',
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
      groupId: {
        type: 'string',
        description: 'ID группы для детализации',
      },
      page: {
        type: 'number',
        description: 'Номер страницы',
      },
    },
    required: ['dateFrom', 'dateTo', 'groupId'],
  },
};

export const getSearchReportDetailsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting search report details', { dateFrom: params.dateFrom, dateTo: params.dateTo, groupId: params.groupId });
    const response = await wbAnalyticsNewClient.post('/api/v2/search-report/table/details', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get search report details', { error });
    return formatError(error, 'wb_get_search_report_details');
  }
};
