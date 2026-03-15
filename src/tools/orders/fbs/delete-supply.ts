/**
 * Инструмент для удаления поставки FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const deleteSupplyTool: ToolDefinition = {
  name: 'wb_delete_supply',
  description:
    'Удалить поставку FBS. Удаление возможно только для поставок, которые ещё не были отправлены.',
  inputSchema: {
    type: 'object',
    properties: {
      supplyId: {
        type: 'string',
        description: 'Идентификатор поставки (например, WB-GI-1234567)',
      },
    },
    required: ['supplyId'],
  },
};

export const deleteSupplyHandler: ToolHandler = async (params) => {
  try {
    const { supplyId } = params as { supplyId: string };

    logger.info('Deleting FBS supply', { supplyId });

    const response = await wbMarketplaceClient.delete(
      `/api/v3/supplies/${supplyId}`
    );

    logger.info('FBS supply deleted successfully', { supplyId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to delete FBS supply', { error });
    return formatError(error, 'wb_delete_supply');
  }
};
