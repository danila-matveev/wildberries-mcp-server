/**
 * Инструмент для получения отчётов по удержаниям
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

const reportTypeToEndpoint: Record<string, string> = {
  'measurement-penalties': '/api/analytics/v1/measurement-penalties',
  'deductions': '/api/analytics/v1/deductions',
  'antifraud-details': '/api/v1/analytics/antifraud-details',
  'goods-labeling': '/api/v1/analytics/goods-labeling',
};

export const getRetentionReportsTool: ToolDefinition = {
  name: 'wb_get_retention_reports',
  description: 'Получить отчёты по удержаниям: штрафы за обмеры, удержания, антифрод, маркировка товаров.',
  inputSchema: {
    type: 'object',
    properties: {
      reportType: {
        type: 'string',
        enum: ['measurement-penalties', 'deductions', 'antifraud-details', 'goods-labeling'],
        description: 'Тип отчёта: measurement-penalties (штрафы за обмеры), deductions (удержания), antifraud-details (антифрод), goods-labeling (маркировка)',
      },
      dateFrom: {
        type: 'string',
        description: 'Дата начала периода (YYYY-MM-DD)',
      },
      dateTo: {
        type: 'string',
        description: 'Дата окончания периода (YYYY-MM-DD)',
      },
    },
    required: ['reportType', 'dateFrom', 'dateTo'],
  },
};

export const getRetentionReportsHandler: ToolHandler = async (params) => {
  try {
    const reportType = params.reportType as string;
    const endpoint = reportTypeToEndpoint[reportType];
    if (!endpoint) {
      throw new Error(`Unknown report type: ${reportType}`);
    }

    logger.info('Getting retention report', { reportType, dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbStatisticsClient.get(endpoint, {
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get retention report', { error });
    return formatError(error, 'wb_get_retention_reports');
  }
};
