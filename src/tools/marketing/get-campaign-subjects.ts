/**
 * Инструмент для получения предметов для рекламных кампаний
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getCampaignSubjectsTool: ToolDefinition = {
  name: 'wb_get_campaign_subjects',
  description: 'Получить список предметов (категорий), доступных для рекламных кампаний.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getCampaignSubjectsHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting campaign subjects');
    const response = await wbAdvClient.get('/adv/v1/supplier/subjects');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get campaign subjects', { error });
    return formatError(error, 'wb_get_campaign_subjects');
  }
};
