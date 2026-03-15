/**
 * Инструмент для получения характеристик предмета
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getSubjectCharcsTool: ToolDefinition = {
  name: 'wb_get_subject_charcs',
  description: 'Получить характеристики предмета по его ID.',
  inputSchema: {
    type: 'object',
    properties: {
      subjectId: { type: 'number', description: 'ID предмета (обязательный)' },
    },
    required: ['subjectId'],
  },
};

export const getSubjectCharcsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting subject characteristics', params);
    const { subjectId, ...queryParams } = params as { subjectId: number; [key: string]: unknown };
    const response = await wbContentClient.get(`/content/v2/object/charcs/${subjectId}`, queryParams);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get subject characteristics', { error });
    return formatError(error, 'wb_get_subject_charcs');
  }
};
