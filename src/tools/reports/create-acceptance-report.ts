/**
 * Инструмент для создания отчёта по приёмке (асинхронный)
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';
import { executeAsyncReport } from '../../utils/async-report.js';

export const createAcceptanceReportTool: ToolDefinition = {
  name: 'wb_create_acceptance_report',
  description: 'Создать и скачать отчёт по приёмке товаров (асинхронная генерация).',
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

export const createAcceptanceReportHandler: ToolHandler = async (params) => {
  try {
    logger.info('Creating acceptance report', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await executeAsyncReport(
      wbStatisticsClient,
      '/api/v1/acceptance_report',
      (taskId) => `/api/v1/acceptance_report/tasks/${taskId}/status`,
      (taskId) => `/api/v1/acceptance_report/tasks/${taskId}/download`,
      { dateFrom: params.dateFrom, dateTo: params.dateTo }
    );
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to create acceptance report', { error });
    return formatError(error, 'wb_create_acceptance_report');
  }
};
