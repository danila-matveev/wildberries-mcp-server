/**
 * Инструмент для массового скачивания документов
 */

import { wbDocumentsClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const downloadAllDocumentsTool: ToolDefinition = {
  name: 'wb_download_documents_bulk',
  description: 'Массово скачать документы по списку ID.',
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        items: { type: 'string' },
        description: 'Массив ID документов для скачивания',
      },
    },
    required: ['ids'],
  },
};

export const downloadAllDocumentsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Downloading documents bulk', { count: (params.ids as string[]).length });
    const response = await wbDocumentsClient.post('/api/v1/documents/download/all', {
      ids: params.ids,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to download documents bulk', { error });
    return formatError(error, 'wb_download_documents_bulk');
  }
};
