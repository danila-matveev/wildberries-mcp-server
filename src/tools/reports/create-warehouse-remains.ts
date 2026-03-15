/**
 * Инструмент для создания отчёта по остаткам на складах (асинхронный)
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';
import { executeAsyncReport } from '../../utils/async-report.js';

export const createWarehouseRemainsTool: ToolDefinition = {
  name: 'wb_create_warehouse_remains',
  description: 'Создать и скачать отчёт по остаткам на складах (асинхронная генерация). Поддерживает группировку по бренду, категории и артикулу продавца.',
  inputSchema: {
    type: 'object',
    properties: {
      groupByBrand: {
        type: 'boolean',
        description: 'Группировать по бренду',
      },
      groupBySubject: {
        type: 'boolean',
        description: 'Группировать по категории',
      },
      groupBySa: {
        type: 'boolean',
        description: 'Группировать по артикулу продавца',
      },
    },
  },
};

export const createWarehouseRemainsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Creating warehouse remains report', params);
    const queryParams: Record<string, unknown> = {};
    if (params.groupByBrand) queryParams.groupByBrand = params.groupByBrand;
    if (params.groupBySubject) queryParams.groupBySubject = params.groupBySubject;
    if (params.groupBySa) queryParams.groupBySa = params.groupBySa;

    const response = await executeAsyncReport(
      wbStatisticsClient,
      '/api/v1/warehouse_remains',
      (taskId) => `/api/v1/warehouse_remains/tasks/${taskId}/status`,
      (taskId) => `/api/v1/warehouse_remains/tasks/${taskId}/download`,
      queryParams
    );
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to create warehouse remains report', { error });
    return formatError(error, 'wb_create_warehouse_remains');
  }
};
