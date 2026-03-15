/**
 * Инструмент для получения детального отчёта о реализации
 */

import { wbDocumentsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getReportDetailTool: ToolDefinition = {
  name: 'wb_get_sales_realization_report',
  description: 'Получить детальный отчёт о реализации товаров за период. Поддерживает пагинацию через rrdid.',
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
      limit: {
        type: 'number',
        description: 'Количество записей на странице',
      },
      rrdid: {
        type: 'number',
        description: 'ID последней записи для пагинации',
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getReportDetailHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting sales realization report', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbDocumentsClient.get('/api/v5/supplier/reportDetailByPeriod', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get sales realization report', { error });
    return formatError(error, 'wb_get_sales_realization_report');
  }
};
