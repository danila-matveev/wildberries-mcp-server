/**
 * Инструмент для получения статистики по кластерам запросов
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getClusterStatsTool: ToolDefinition = {
  name: 'wb_get_cluster_stats',
  description: 'Получить статистику по кластерам поисковых запросов рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
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
    required: ['advertId'],
  },
};

export const getClusterStatsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting cluster stats', { advertId: params.advertId });
    const body: Record<string, unknown> = { advertId: params.advertId };
    if (params.dateFrom) body.dateFrom = params.dateFrom;
    if (params.dateTo) body.dateTo = params.dateTo;
    const response = await wbAdvClient.post('/adv/v0/normquery/stats', body);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get cluster stats', { error });
    return formatError(error, 'wb_get_cluster_stats');
  }
};
