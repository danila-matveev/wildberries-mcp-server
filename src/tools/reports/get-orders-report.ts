/**
 * Инструмент для получения отчёта по заказам
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getOrdersReportTool: ToolDefinition = {
  name: 'wb_get_orders_report',
  description: 'Получить отчёт по заказам. Флаг 0 — все заказы за период, 1 — только изменённые.',
  inputSchema: {
    type: 'object',
    properties: {
      dateFrom: {
        type: 'string',
        description: 'Дата начала отчёта (YYYY-MM-DD)',
      },
      flag: {
        type: 'number',
        enum: [0, 1],
        description: '0 — все заказы за период, 1 — только изменённые с dateFrom',
      },
    },
    required: ['dateFrom'],
  },
};

export const getOrdersReportHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting orders report', { dateFrom: params.dateFrom, flag: params.flag });
    const response = await wbStatisticsClient.get('/api/v1/supplier/orders', {
      dateFrom: params.dateFrom,
      ...(params.flag !== undefined && { flag: params.flag }),
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get orders report', { error });
    return formatError(error, 'wb_get_orders_report');
  }
};
