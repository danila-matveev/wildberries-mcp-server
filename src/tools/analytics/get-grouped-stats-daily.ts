/**
 * Инструмент для получения группированной ежедневной статистики
 */

import { wbAnalyticsNewClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getGroupedStatsDailyTool: ToolDefinition = {
  name: 'wb_get_grouped_stats_daily',
  description: 'Получить группированную ежедневную статистику воронки продаж (по категории, бренду или тегу).',
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
      groupBy: {
        type: 'string',
        enum: ['subject', 'brand', 'tag'],
        description: 'Группировка: subject (категория), brand (бренд), tag (тег)',
      },
      period: {
        type: 'string',
        enum: ['day', 'week'],
        description: 'Период группировки (day или week)',
      },
      page: {
        type: 'number',
        description: 'Номер страницы',
      },
    },
    required: ['dateFrom', 'dateTo', 'groupBy'],
  },
};

export const getGroupedStatsDailyHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting grouped stats daily', { dateFrom: params.dateFrom, dateTo: params.dateTo, groupBy: params.groupBy });
    const response = await wbAnalyticsNewClient.post('/api/analytics/v3/sales-funnel/grouped/history', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get grouped stats daily', { error });
    return formatError(error, 'wb_get_grouped_stats_daily');
  }
};
