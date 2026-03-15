/**
 * Инструмент для получения кодов ТНВЭД
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getTnvedTool: ToolDefinition = {
  name: 'wb_get_tnved',
  description: 'Получить справочник кодов ТНВЭД. Можно фильтровать по ID предмета.',
  inputSchema: {
    type: 'object',
    properties: {
      subjectId: { type: 'number', description: 'ID предмета для фильтрации (необязательный)' },
    },
  },
};

export const getTnvedHandler: ToolHandler = async (params) => {
  try {
    logger.info('Getting TNVED codes', params);
    const response = await wbContentClient.get('/content/v2/directory/tnved', params);
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get TNVED codes', { error });
    return formatError(error, 'wb_get_tnved');
  }
};
