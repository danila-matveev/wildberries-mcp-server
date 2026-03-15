/**
 * Инструмент для скачивания документа
 */

import { wbDocumentsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const downloadDocumentTool: ToolDefinition = {
  name: 'wb_download_document',
  description: 'Скачать документ по его ID.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID документа',
      },
    },
    required: ['id'],
  },
};

export const downloadDocumentHandler: ToolHandler = async (params) => {
  try {
    logger.info('Downloading document', { id: params.id });
    const response = await wbDocumentsClient.get('/api/v1/documents/download', { id: params.id });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to download document', { error });
    return formatError(error, 'wb_download_document');
  }
};
