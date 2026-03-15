/**
 * Инструмент для получения отчёта по поисковым запросам
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getSearchReportTool: ToolDefinition = {
  name: 'wb_get_search_report',
  description: 'Получить сводный отчёт по поисковым запросам за период.',
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
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getSearchReportHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting search report', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbAnalyticsNewClient.post('/api/v2/search-report/report', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get search report', { error });
    return formatError(error, 'wb_get_search_report');
  }
};
