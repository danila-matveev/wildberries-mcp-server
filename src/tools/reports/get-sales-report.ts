/**
 * Инструмент для получения отчёта по продажам
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getSalesReportTool: ToolDefinition = {
  name: 'wb_get_sales_report',
  description: 'Получить отчёт по продажам.',
  inputSchema: {
    type: 'object',
    properties: {
      dateFrom: {
        type: 'string',
        description: 'Дата начала отчёта (YYYY-MM-DD)',
      },
      flag: {
        type: 'number',
        description: '0 — все продажи за период, 1 — только изменённые с dateFrom',
      },
    },
    required: ['dateFrom'],
  },
};

export const getSalesReportHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting sales report', { dateFrom: params.dateFrom, flag: params.flag });
    const response = await wbStatisticsClient.get('/api/v1/supplier/sales', {
      dateFrom: params.dateFrom,
      ...(params.flag !== undefined && { flag: params.flag }),
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get sales report', { error });
    return formatError(error, 'wb_get_sales_report');
  }
};
