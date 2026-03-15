/**
 * Инструмент для создания отчёта по платному хранению (асинхронный)
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';
import { executeAsyncReport } from '../../utils/async-report.js';

export const createPaidStorageReportTool: ToolDefinition = {
  name: 'wb_create_paid_storage_report',
  description: 'Создать и скачать отчёт по платному хранению (асинхронная генерация).',
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

export const createPaidStorageReportHandler: ToolHandler = async (params) => {
  try {
    logger.info('Creating paid storage report', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await executeAsyncReport(
      wbStatisticsClient,
      '/api/v1/paid_storage',
      (taskId) => `/api/v1/paid_storage/tasks/${taskId}/status`,
      (taskId) => `/api/v1/paid_storage/tasks/${taskId}/download`,
      { dateFrom: params.dateFrom, dateTo: params.dateTo }
    );
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to create paid storage report', { error });
    return formatError(error, 'wb_create_paid_storage_report');
  }
};
