/**
 * Инструмент для получения списка документов
 */

import { wbDocumentsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getDocumentsListTool: ToolDefinition = {
  name: 'wb_get_documents',
  description: 'Получить список документов за период.',
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
  },
};

export const getDocumentsListHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting documents list', params);
    const response = await wbDocumentsClient.get('/api/v1/documents/list', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get documents list', { error });
    return formatError(error, 'wb_get_documents');
  }
};
