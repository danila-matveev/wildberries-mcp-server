/**
 * Инструмент для получения доли бренда
 */

import { wbStatisticsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getBrandShareTool: ToolDefinition = {
  name: 'wb_get_brand_share',
  description: 'Получить отчёт по доле бренда в продажах. Также предоставляет список брендов и родительских категорий.',
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
      brandId: {
        type: 'number',
        description: 'ID бренда для фильтрации',
      },
    },
    required: ['dateFrom', 'dateTo'],
  },
};

export const getBrandShareHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting brand share', { dateFrom: params.dateFrom, dateTo: params.dateTo });
    const response = await wbStatisticsClient.get('/api/v1/analytics/brand-share', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get brand share', { error });
    return formatError(error, 'wb_get_brand_share');
  }
};
