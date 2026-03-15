/**
 * Инструмент для получения отчёта по акцизам
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getExciseReportTool: ToolDefinition = {
  name: 'wb_get_excise_report',
  description: 'Получить отчёт по акцизным товарам за период.',
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

export const getExciseReportHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting excise report', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbStatisticsClient.post('/api/v1/analytics/excise-report', {
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get excise report', { error });
    return formatError(error, 'wb_get_excise_report');
  }
};
