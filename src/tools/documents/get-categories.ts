/**
 * Инструмент для получения категорий документов
 */

import { wbDocumentsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const getCategoriesTool: ToolDefinition = {
  name: 'wb_get_document_categories',
  description: 'Получить список категорий документов.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const getCategoriesHandler: ToolHandler = async (_params) => {
  try {
    logger.info('Getting document categories');
    const response = await wbDocumentsClient.get('/api/v1/documents/categories');
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get document categories', { error });
    return formatError(error, 'wb_get_document_categories');
  }
};
