/**
 * Инструмент для привязки тегов к товарам
 */

import { wbContentClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const linkTagToProductTool: ToolDefinition = {
  name: 'wb_link_tag_to_product',
  description: 'Привязать теги к номенклатуре товара.',
  inputSchema: {
    type: 'object',
    properties: {
      nmID: { type: 'number', description: 'ID номенклатуры' },
      tagsIDs: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив ID тегов для привязки',
      },
    },
    required: ['nmID', 'tagsIDs'],
  },
};

export const linkTagToProductHandler: ToolHandler = async (params) => {
  try {
    logger.info('Linking tag to product', params);
    const { nmID, tagsIDs } = params as { nmID: number; tagsIDs: number[] };
    const response = await wbContentClient.post('/content/v2/tag/nomenclature/link', { nmID, tagsIDs });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to link tag to product', { error });
    return formatError(error, 'wb_link_tag_to_product');
  }
};
